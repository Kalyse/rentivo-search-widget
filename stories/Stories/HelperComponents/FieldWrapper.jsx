import React from 'react';
import throttle from 'lodash/throttle';

import '~components/Searchbar/Searchbar.scss';
import { WIDGET_SIZES } from '~core/constants';
import getWidgetSize from '~core/helpers/getWidgetSize';


export default class FieldWrapper extends React.Component {
    FieldWrapperRef = React.createRef();

    state = {
        containerWidth: null,
    };

    _getContainerWidth = () => {
        const container      = this.FieldWrapperRef.current;
        const containerWidth = getComputedStyle(container).width;
        return parseInt(containerWidth);
    };

    _manageWidgetSize = () => this.setState({
        containerWidth: this._getContainerWidth()
    });

    _throttledManageWidgetSize = throttle(this._manageWidgetSize, 150);

    componentDidMount() {
        this._manageWidgetSize();
        window.addEventListener('resize', this._throttledManageWidgetSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._throttledManageWidgetSize);
    }

    render() {
        const minWidth = 200;
        let width      = Math.min(this.state.containerWidth, this.props.width);
        width          = Math.max(width, minWidth);

        const widgetSizeId = getWidgetSize(width, WIDGET_SIZES);

        return (
            <div
                style={ {
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:          '100%',
                    paddingBottom: '215px',
                    ...this.props.style
                } }
                ref={ this.FieldWrapperRef }
            >
                <div
                    style={ {
                        minWidth: minWidth + 'px',
                        maxWidth: width,
                        flexGrow: 1,
                        position: 'relative'
                    } }
                    className={ `Searchbar ${ WIDGET_SIZES[widgetSizeId].classnames }` }
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
                    { React.cloneElement(this.props.children, { widgetSizeId }) }
                </div>
            </div>
        );
    }
};