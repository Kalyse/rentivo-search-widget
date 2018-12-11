import React from 'react';
import PropTypes from 'prop-types';

import './PlusMinusOption.scss';

const PlusMinusOption = ({
    title,
    controls
}) => (
    <div className="PlusMinusOption">
        <span className="PlusMinusOption__Title">{ title }</span>
        <span className="PlusMinusOption__Controls">{ controls }</span>
    </div>
);

PlusMinusOption.propTypes = {
    title:    PropTypes.string.isRequired,
    controls: PropTypes.element.isRequired,
};

export default React.memo(PlusMinusOption);
