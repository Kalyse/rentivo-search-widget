import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { generateDatesFieldsPart } from '~core/helpers/prepareSubmitUrl'

import './style.scss';

export default class DatesFields extends React.PureComponent {
    state = {
        focusedInput:   null,
        startDate:      this.props.initialStartDate,
        endDate:        this.props.initialEndDate,
        numberOfMonths: 2,
        appendToBody:   true
    };

    get urlPart() {
        return generateDatesFieldsPart(this.state, this.props)
    };

    onDatesChange = ({ startDate, endDate }) => this.setState({ startDate, endDate });

    onFocusChange = focusedInput => this.setState({ focusedInput });

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        if (window.innerWidth < 640) {
            this.state.numberOfMonths = 1;
            this.render();
        }
    }

    render() {
        return (
            <div className="DatesFields">
                <DateRangePicker
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
                />
            </div>
        );
    }
}

DatesFields.propTypes = {
    startDateId:      PropTypes.string,
    endDateId:        PropTypes.string,
    initialStartDate: PropTypes.oneOfType( [PropTypes.object, PropTypes.number] ),
    initialEndDate:   PropTypes.oneOfType( [PropTypes.object, PropTypes.number] ),
    dateFormat:       PropTypes.string,
    appendToBody:     PropTypes.bool
};
