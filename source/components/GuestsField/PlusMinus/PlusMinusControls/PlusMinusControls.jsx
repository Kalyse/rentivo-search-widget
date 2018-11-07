import React from 'react';
import PropTypes from 'prop-types';

import './PlusMinusControls.scss';

const intervalValue = 150;
let intervalId      = null;

const PlusMinusControls = ({
    onIncrease,
    onDecrease,
    increaseBtnDisabled,
    decreaseBtnDisabled
}) => (
    <div className="PlusMinusControls">
        <span
            className="PlusMinusControls__Minus"
            onClick={ onDecrease }
            onMouseDown={ () => intervalId = setInterval(onDecrease, intervalValue) }
            onMouseUp={ () => clearInterval(intervalId) }
            onMouseOut={ () => clearInterval(intervalId) }
            aria-disabled={ decreaseBtnDisabled }
        />
        <span
            className="PlusMinusControls__Plus"
            onClick={ onIncrease }
            onMouseDown={ () => intervalId = setInterval(onIncrease, intervalValue) }
            onMouseUp={ () => clearInterval(intervalId) }
            onMouseOut={ () => clearInterval(intervalId) }
            aria-disabled={ increaseBtnDisabled }
        />
    </div>
);

PlusMinusControls.propTypes = {
    onIncrease:          PropTypes.func.isRequired,
    onDecrease:          PropTypes.func.isRequired,
    increaseBtnDisabled: PropTypes.bool,
    decreaseBtnDisabled: PropTypes.bool
};

export default PlusMinusControls;