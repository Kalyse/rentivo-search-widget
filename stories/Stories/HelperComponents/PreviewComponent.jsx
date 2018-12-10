import React from 'react';

export default ({ children }) => {
    return (
        <div style={ {
            margin:          '16px 0px',
            padding:         '35px 0',
            border:          '1px solid #ddd',
            outline:         'none',
            boxSizing:       'border-box',
            backgroundColor: '#f8f8f8',
        } }
        >{ children }</div>
    );
}