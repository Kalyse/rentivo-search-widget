import React from 'react';

export default ({ maxWidth, children }) => (
    <div style={ {
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          "100%",
    } }>
        <div style={ {
            flexGrow: 1,
            maxWidth
        } }>{ children }</div>
    </div>
);