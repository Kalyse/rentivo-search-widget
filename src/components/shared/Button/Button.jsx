import React from "react";
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ children, styleType, onClick }) => (
    <button className={ `Button Button--${ styleType }` }
            type="button"
            onClick={ onClick }
    >{ children }</button>
);

Button.propTypes = {
    children:  PropTypes.node.isRequired,
    styleType: PropTypes.oneOf(['default', 'search']).isRequired,
    onClick:   PropTypes.func.isRequired
};

Button.defaultProps = {
    styleType: 'default'
};

export default React.memo(Button);

