import React from 'react';
import PropTypes from 'prop-types';

import { WIDGET_SIZES } from '~core/constants';
import { generateDatesFieldsPart } from '~core/helpers/prepareSubmitUrl'

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

        getNumberOfMonths = () => {
            if ([WIDGET_SIZES.DEFAULT.id, WIDGET_SIZES.TINY.id].includes(this.props.widgetSizeId)) {
                return 1;
            }
            return 2;
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
                    numberOfMonths={ this.getNumberOfMonths() }
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
        widgetSizeId:     PropTypes.oneOf(Object.keys(WIDGET_SIZES))
    };

    DatesFieldsController.defaultProps = {
        startDateId:      'checkIn',
        endDateId:        'checkOut',
        initialStartDate: null,
        initialEndDate:   null,
        dateFormat:       'DD/MM/YYYY',
        appendToBody:     false,
        numberOfMonths:   2,
    };

    return DatesFieldsController;
};