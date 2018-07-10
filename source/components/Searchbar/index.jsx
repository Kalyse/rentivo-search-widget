import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import Select2 from 'react-select2-wrapper';

import 'react-dates/lib/css/_datepicker.css';
import 'react-select2-wrapper/css/select2.css';
import './style.scss';

import {
    convertSchemaToSearchFieldData,
    convertSchemaToGuestsFieldData
}                 from '~core/helpers/convertSchema';
import prepareUrl from '~core/helpers/prepareSubmitUrl';

import guestsSchema from '~core/guestsSchema.json';

export default class Searchbar extends React.Component {
    static defaultProps = {
        searchField: {
            initialValue: [],
            placeholder: 'Where do you want to go?',
            searchSchema: []
        },
        datesFields: {
            startDateId: 'checkIn',
            endDateId: 'checkOut',
            initialStartDate: null,
            initialEndDate: null,
            dateFormat: 'DD/MM/YYYY',
            appendToBody: true
        },
        guestsField: {
            initialValue: '1',
            guestsSchema,
        },
        baseUrl: `${ window.location.protocol }//${ window.location.host }`
    };

    convertedSearchSchema = convertSchemaToSearchFieldData(this.props.searchField.searchSchema);
    convertedGuestsSchema = convertSchemaToGuestsFieldData(this.props.guestsField.guestsSchema);

    state = {
        searchField: {
            value: this.props.searchField.initialValue
        },
        datesFields: {
            focusedInput: null,
            startDate: this.props.datesFields.initialStartDate,
            endDate: this.props.datesFields.initialEndDate,
            appendToBody: this.props.datesFields.appendToBody,
        },
        guestsField: {
            value: this.props.guestsField.initialValue
        },
    };

    onDatesChange = ({ startDate, endDate }) => this.setState((prevState) => ({
        datesFields: {
            ...prevState.datesFields,
            startDate,
            endDate
        }
    }));

    onFocusChange = (focusedInput) => this.setState((prevState) => ({
        datesFields: {
            ...prevState.datesFields,
            focusedInput
        }
    }));

    searchFieldChange = () => this.setState({
        searchField: {
            ...this.state.searchField,
            value: this.searchField.el.val()
        }
    });

    guestsFieldChange = () => this.setState({
        guestsField: {
            ...this.state.guestsField,
            value: this.guestsField.el.val()
        }
    });

    submitForm = () => {
        const generatedUrlPart = prepareUrl(this.state, this.props);
        const completedUrl = this.props.baseUrl + generatedUrlPart;

        return window.location.href = completedUrl;
    };

    render() {
        return (
            <form className="Searchbar">
                <div className="l-container">
                    <div className="l-grid">
                        <div className="l-col--selectpicker">
                            <Select2
                                multiple
                                value={ this.state.searchField.value }
                                data={ this.convertedSearchSchema }
                                options={{
                                    placeholder: this.props.searchField.placeholder,
                                    width: '100%',
                                }}
                                onChange={ this.searchFieldChange }
                                ref={(e) => { this.searchField = e; }}
                            />
                        </div>
                        <div className="l-col--datepicker">
                            <DateRangePicker
                                startDate={ this.state.datesFields.startDate }
                                startDateId={ this.props.datesFields.startDateId }
                                endDate={ this.state.datesFields.endDate }
                                endDateId={ this.props.datesFields.endDateId }
                                focusedInput={ this.state.datesFields.focusedInput }
                                onDatesChange={ this.onDatesChange }
                                onFocusChange={ this.onFocusChange }
                                displayFormat={ this.props.datesFields.dateFormat }
                                appendToBody={ this.state.datesFields.appendToBody }
                            />
                        </div>
                        <div className="l-col--guests">
                            <Select2
                                value={ this.state.guestsField.value }
                                data={ this.convertedGuestsSchema }
                                options={{
                                    width: '100%',
                                    minimumResultsForSearch: 'Infinity'
                                }}
                                onChange={ this.guestsFieldChange }
                                ref={(e) => { this.guestsField = e; }}
                            />
                        </div>
                        <div className="l-col--search">
                            <button className="Searchbar__search form-item"
                                    type="button"
                                    onClick={ this.submitForm }
                            >Search</button>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

Searchbar.propTypes = {
    searchField: PropTypes.shape({
        initialValue: PropTypes.array,
        placeholder: PropTypes.string,
        searchSchema: PropTypes.array
    }),
    datesFields: PropTypes.shape({
        startDateId: PropTypes.string,
        endDateId: PropTypes.string,
        initialStartDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        initialEndDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        dateFormat: PropTypes.string,
        appendToBody: PropTypes.bool
    }),
    guestsField: PropTypes.shape({
        initialValue: PropTypes.string,
        guestsSchema: PropTypes.object
    }),
    baseUrl: PropTypes.string.isRequired
};
