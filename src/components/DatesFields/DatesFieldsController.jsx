import React from 'react';
import PropTypes from 'prop-types';

import { WIDGET_SIZES } from '~core/constants';
import { generateDatesFieldsPart } from '~core/helpers/prepareSubmitUrl'
import { DateRangePicker } from "react-dates";

export default (DatesFields) => {
    class DatesFieldsController extends React.PureComponent {
        state = {
            focusedInput: null,
            startDate:    this.props.initialStartDate,
            endDate:      this.props.initialEndDate
        };

        get urlPart() {
            return generateDatesFieldsPart(this.state, this.props)
        };

        onDatesChange = ({ startDate, endDate }) => this.setState({ startDate, endDate });

        onFocusChange = focusedInput => this.setState({ focusedInput });

        render() {
            return (
                <DatesFields
                    startDate={ this.state.startDate }
                    startDateId={ this.props.startDateId }
                    endDate={ this.state.endDate }
                    endDateId={ this.props.endDateId }
                    focusedInput={ this.state.focusedInput }
                    onDatesChange={ this.onDatesChange }
                    onFocusChange={ this.onFocusChange }
                    displayFormat={ this.props.dateFormat }
                    numberOfMonths={ this.state.numberOfMonths }
                    appendToBody={ this.props.appendToBody }
                    isOpen={ !!this.state.focusedInput }
                />
            );
        }
    }

    DatesFieldsController.propTypes = {
        startDateId:      PropTypes.string,
        endDateId:        PropTypes.string,
        initialStartDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        initialEndDate:   PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        dateFormat:       PropTypes.string,
        appendToBody:     PropTypes.bool,
        widgetSize:       PropTypes.oneOf(Object.values(WIDGET_SIZES))
    };

    DatesFieldsController.defaultProps = {
        startDateId:      'checkIn',
        endDateId:        'checkOut',
        initialStartDate: null,
        initialEndDate:   null,
        dateFormat:       'DD/MM/YYYY',
        appendToBody:     true,
        numberOfMonths:   2,
    };

    return DatesFieldsController;
};