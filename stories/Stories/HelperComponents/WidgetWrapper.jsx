import React from 'react';
import throttle from 'lodash/throttle';

export default class WidgetWrapper extends React.Component {
    WidgetWrapperRef = React.createRef();

    constructor(props) {
        super(props);
    }

    state = {
        containerWidth: this.props.width,
        hasError:       false
    };

    _invokeResize = () => {
        const event = new CustomEvent('resize');
        window.dispatchEvent(event);
    };

    _throttledInvokeRisize = throttle(this._invokeResize, 150);

    _getContainerWidth = () => {
        const container      = this.WidgetWrapperRef.current;
        const containerWidth = getComputedStyle(container).width;
        return parseInt(containerWidth);
    };

    _manageWidgetSize = () => {
        this.setState({
            containerWidth: this._getContainerWidth()
        });
    };

    _throttledManageWidgetSize = throttle(this._manageWidgetSize, 150);

    componentDidMount() {
        this._manageWidgetSize();
        window.addEventListener('resize', this._throttledManageWidgetSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._throttledManageWidgetSize);
    }

    // to invoke resize event when window was not actually be resized
    componentDidUpdate(prevProps, prevState) {
        if (this.props.width !== prevProps.width || this.state.containerWidth !== prevState.containerWidth) {
            this._throttledInvokeRisize();
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong</h1>;
        }

        const minWidth = 200;
        let width      = Math.min(this.state.containerWidth, this.props.width);
        width          = Math.max(width, minWidth);

        return (
            <div
                style={ {
                    display:        'flex',
                    flexWrap:       'wrap',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:          '100%',
                    paddingBottom:  '215px',
                    ...this.props.style
                } }
                ref={ this.WidgetWrapperRef }
            >
                <div
                    style={ {
                        minWidth: minWidth + 'px',
                        maxWidth: width,
                        flexGrow: 1,
                        position: 'relative'
                    } }
                >
                    <div style={ {
                        position:     'absolute',
                        right:        '0',
                        bottom:       '100%',
                        marginBottom: '10px',
                        fontFamily:   'Arial, sans-serif',
                        fontSize:     '12px',
                        color:        '#aaa'
                    } }>width: { width }px
                    </div>
                    { this.props.children }
                </div>
            </div>
        );
    }
};