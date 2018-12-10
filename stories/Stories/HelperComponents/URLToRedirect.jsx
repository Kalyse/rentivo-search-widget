import React from 'react';

export default class URLToRedirect extends React.PureComponent {
    state = {
        generatedURL: null,
    };

    _catchGeneratedURL = (e) => {
        if (e.detail) {
            this.setState({
                generatedURL: e.detail
            })
        }
    };

    componentDidMount() {
        window.addEventListener('redirect', this._catchGeneratedURL);
    }

    componentWillUnmount() {
        window.removeEventListener('redirect', this._catchGeneratedURL);
    }

    render() {
        return (
            <div
                style={ {
                    fontFamily:   'Arial, sans-serif',
                    marginBottom: '15px',
                    color:        '#333',
                    width:        '100%',
                    marginTop:    '15px',
                    lineHeight:   '17px'
                } }
            >
                <span style={ {
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold'
                } }>{ this.state.generatedURL && 'URL to redirect: ' }</span>
                <span
                    style={ {
                        // textDecoration: 'underline',
                        marginLeft:     '5px',
                        overflowWrap:   'break-word',
                        wordWrap:       'break-word'
                    } }
                >{ this.state.generatedURL }</span>
            </div>
        );
    }
}