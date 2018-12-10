import React from 'react';
import PropTypes from 'prop-types';

import './NestedMenuBackLink.scss';

const NestedMenuBackLink = ({
    onBackClick
}) => {
    return (
        <li
            className='NestedMenuBack'
            onClick={ onBackClick }
        >
            <i className="icon-left-open"/>
            <span>back</span>
        </li>
    );
};

export default React.memo(NestedMenuBackLink);