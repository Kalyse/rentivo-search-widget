import React from 'react';
import PropTypes from 'prop-types';

import { WIDGET_SIZES } from '~core/constants';
import { datesFields } from '~core/defaults';
import { generateCustomDatesFieldsPart, generateDatesFieldsPart } from './helpers/urlGenerator';

export default (DatesFields) => {
    class DatesFieldsController extends React.PureComponent {
        state = {
            focusedInput: null,
            startDate:    null,
            endDate:      null
        };

        get urlPart() {
            return generateDatesFieldsPart(this.state, this.props);
        };

        get customUrlPart() {
            return generateCustomDatesFieldsPart(this.state, this.props);
        };

        getNumberOfMonths = () => {
            if ([WIDGET_SIZES.DEFAULT.id, WIDGET_SIZES.TINY.id].includes(this.props.widgetSizeId)) {
                return 1;
            }
            return this.props.numberOfMonths;
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
                    displayFormat={ this.props.inputDateFormat }
                    numberOfMonths={ this.getNumberOfMonths() }
                    appendToBody={ this.props.appendToBody }
                    isOpen={ !!this.state.focusedInput }
                    horizontalMargin={ 20 }
                    startDatePlaceholderText={ this.props.startDatePlaceholderText }
                    endDatePlaceholderText={ this.props.endDatePlaceholderText }
                />
            );
        }
    }

    DatesFieldsController.propTypes = {
        startDateId:              PropTypes.string,
        endDateId:                PropTypes.string,
        inputDateFormat:          PropTypes.string,
        urlDateFormat:            PropTypes.string,
        appendToBody:             PropTypes.bool,
        numberOfMonths:           PropTypes.number,
        startDatePlaceholderText: PropTypes.string,
        endDatePlaceholderText:   PropTypes.string,
        widgetSizeId:             PropTypes.oneOf(Object.keys(WIDGET_SIZES))
    };

    DatesFieldsController.defaultProps = {
        ...datesFields
    };

    return DatesFieldsController;
};