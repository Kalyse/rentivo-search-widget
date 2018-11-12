import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import withController from './DatesFieldsController';
import './DatesFields.scss';

const DatesFields = ({ isOpen, ...props }) => (
    <div className={ `DatesFields ${isOpen && 'DatesFields--open'}` }>
        <DateRangePicker { ...props }/>
    </div>
);

DatesFields.propTypes = {
    startDate:      PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    startDateId:    PropTypes.string.isRequired,
    endDate:        PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    endDateId:      PropTypes.string.isRequired,
    focusedInput:   PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    onDatesChange:  PropTypes.func.isRequired,
    onFocusChange:  PropTypes.func.isRequired,
    numberOfMonths: PropTypes.number,
    displayFormat:  PropTypes.string,
    appendToBody:   PropTypes.bool,
};

export default withController(React.memo(DatesFields));
