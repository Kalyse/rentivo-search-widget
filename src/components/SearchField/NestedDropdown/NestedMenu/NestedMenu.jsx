import React from 'react';
import PropTypes from 'prop-types';

import './NestedMenu.scss';

const NestedMenu = ({
    children,
    rows
}) => {
    return (
        <div
            className='NestedMenu'
            style={ {
                height: rows <= 7 ? rows * 40 + 'px' : 280 + 'px'
            } }
        >{ children }</div>
    );
};

export default NestedMenu;
