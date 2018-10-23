import React from 'react';
import PropTypes from 'prop-types';

import SearchField from '~components/SearchField/SearchField';
import DatesFields from '~components/DatesFields/DatesFields';
import GuestsField from '~components/GuestsField/GuestsField';

import './Searchbar.scss';

export default class Searchbar extends React.PureComponent {
    SearchFieldRef = React.createRef();
    DatesFieldsRef = React.createRef();
    GuestsFieldRef = React.createRef();

    state = {
        searchField: {},
        datesFields: {},
        guestsField: {},
    };

    submitForm = () => {
        const searchFieldUrlPart = this.SearchFieldRef.current.urlPart;
        const datesFieldsUrlPart = this.DatesFieldsRef.current.urlPart;
        const guestsFieldUrlPart = this.GuestsFieldRef.current.urlPart;

        let urlChunks = [datesFieldsUrlPart, guestsFieldUrlPart];

        if (this.props.searchField.mode === 'GooglePlaces') {
            urlChunks.push(searchFieldUrlPart);
        } else {
            urlChunks.unshift(searchFieldUrlPart);
        }

        urlChunks = urlChunks.filter(chunk => !!chunk);

        const completedUrl = this.props.baseUrl + urlChunks.join('/') + this.props.appendString;

        return window.location.href = completedUrl;
    };

    render() {
        return (
            <form className="Searchbar">
                <div className="l-container">
                    <div className="l-grid">
                        <div className="l-col--searchField">
                            <SearchField
                                searchFieldData={ this.props.searchField }
                                ref={ this.SearchFieldRef }
                            />
                        </div>
                        <div className="l-col--datesFields">
                            <DatesFields
                                { ...this.props.datesFields }
                                ref={ this.DatesFieldsRef }
                            />
                        </div>
                        <div className="l-col--guestsField">
                            <GuestsField
                                { ...this.props.guestsField }
                                ref={ this.GuestsFieldRef }
                            />
                        </div>
                        <div className="l-col--submitBtn">
                            <button className="Searchbar__search"
                                    type="button"
                                    onClick={ this.submitForm }
                            >Search
                            </button>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

Searchbar.propTypes = {
    searchField: PropTypes.oneOfType( [
        PropTypes.shape( {
            initialValue: PropTypes.array,
            placeholder:  PropTypes.string,
            searchSchema: PropTypes.array,
            mode: PropTypes.string
        } ),
        PropTypes.shape( {
            initialValue: PropTypes.string,
            placeholder:  PropTypes.string,
            guestsSchema: PropTypes.object,
            mode: PropTypes.string
        } ),
        PropTypes.shape( {
            API_KEY: PropTypes.string,
            placeholder:  PropTypes.string,
            mode: PropTypes.string,
            componentRestrictions: PropTypes.object
        } )
    ] ),
    datesFields: PropTypes.shape( {
        startDateId:      PropTypes.string,
        endDateId:        PropTypes.string,
        initialStartDate: PropTypes.oneOfType( [PropTypes.object, PropTypes.number] ),
        initialEndDate:   PropTypes.oneOfType( [PropTypes.object, PropTypes.number] ),
        dateFormat:       PropTypes.string,
        appendToBody:     PropTypes.bool
    } ),
    guestsField: PropTypes.shape( {
        initialValue: PropTypes.string,
        guestsSchema: PropTypes.object
    } ),
    baseUrl:     PropTypes.string.isRequired,
    appendString:     PropTypes.string,
};
