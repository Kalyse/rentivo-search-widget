import React from 'react';

export default ({ maxWidth, children }) => (
    <div style={ {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '100%',
    } }>
        <div style={ {
            flexGrow:        1,
            maxWidth:        maxWidth,
            padding:         '15px',
            backgroundColor: '#f7f7f7',
            border:          '1px solid #ddd',
            borderRadius:    '5px'
        } }>{ children }</div>
    </div>
);