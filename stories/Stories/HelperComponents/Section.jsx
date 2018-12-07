import React from 'react';

export default ({ last, children }) => (
    <section
        style={ {
            padding:      '15px',
            border:       '1px solid #ccc',
            borderBottom: last ? '1px solid #ccc' : 0,
        } }
    >{ children }</section>
);