import React from 'react';
import PropTypes from 'prop-types';

import './PlusMinusControls.scss';

let intervalId = null;

const PlusMinusControls = ({
    onIncrease,
    onDecrease,
    interval,
    isIncreaseBtnDisabled,
    isDecreaseBtnDisabled,
}) => (
    <div className="PlusMinusControls">
        <span
            className="PlusMinusControls__Minus"
            onClick={ onDecrease }
            onMouseDown={ () => intervalId = setInterval(onDecrease, interval) }
            onMouseUp={ () => clearInterval(intervalId) }
            onMouseOut={ () => clearInterval(intervalId) }
            aria-disabled={ isDecreaseBtnDisabled }
        />
        <span
            className="PlusMinusControls__Plus"
            onClick={ onIncrease }
            onMouseDown={ () => intervalId = setInterval(onIncrease, interval) }
            onMouseUp={ () => clearInterval(intervalId) }
            onMouseOut={ () => clearInterval(intervalId) }
            aria-disabled={ isIncreaseBtnDisabled }
        />
    </div>
);

PlusMinusControls.propTypes = {
    onIncrease:            PropTypes.func.isRequired,
    onDecrease:            PropTypes.func.isRequired,
    interval:              PropTypes.number.isRequired,
    isIncreaseBtnDisabled: PropTypes.bool,
    isDecreaseBtnDisabled: PropTypes.bool,
};

export default React.memo(PlusMinusControls);