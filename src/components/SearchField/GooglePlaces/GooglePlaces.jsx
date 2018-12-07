import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import loadGoogleMapsAPI from "load-google-maps-api-2";

import { generateGooglePlacesPart } from './helpers/urlGenerator';

import './GooglePlaces.scss';

class GooglePlaces extends React.PureComponent {
    searchField = React.createRef();

    state = {
        address:          '',
        searchResultData: '',
    };

    constructor(props) {
        super(props);

        // look at description for "componentDidMount" code
        if (window.googlePlacesInstanceCount === undefined) {
            window.googlePlacesInstanceCount = 0;
        }
        this.googlePlacesInstanceId = ++window.googlePlacesInstanceCount;
    }

    generateUrlPart       = () => generateGooglePlacesPart(this.state.searchResultData);
    generateCustomUrlPart = () => null;

    handleChange = address => this.setState({ address });

    handleSelect = address => {
        this.setState({ address });

        geocodeByAddress(address)
            .then(results => {
                const searchResultData = {
                    ...results[0],
                    rentivoDestinationField: address.replace(', ', '--')
                };

                this.setState({ searchResultData })
            })
            .catch(error => console.error('Error', error));
    };

    handleError = (status, clearSuggestions) => {
        const allowedErrorsStatuses = ['NOT_FOUND', 'ZERO_RESULTS'];
        if (!allowedErrorsStatuses.includes(status)) {
            console.error('Google Maps API returned error with status: ', status);
            clearSuggestions();
        }
    };

    // when we have multiple instances of widget with "GooglePlaces" search field mode - occurs multiple loading of google maps API, which leads to errors. To solve this problem I have to write this ugly code. If you find out the better way to solve this problem - be welcome to change this one
    componentDidMount() {
        if (!window.google) {
            if (!window.isGoogleApiLoading) {
                window.isGoogleApiLoading       = true;
                window.googlePlacesCallbackList = [];
                window.googlePlacesCallback     = () => {
                    window.googlePlacesCallbackList.forEach(callback => window[callback] && window[callback]());
                };

                loadGoogleMapsAPI({
                    key:       this.props.API_KEY,
                    libraries: ['places'],
                    language:  'en'
                }).then(() => {
                    window.googlePlacesCallback();
                });
            }

            window.googlePlacesCallbackList.push(`googlePlacesCallback_${ this.googlePlacesInstanceId }`);
        }
    }

    componentWillUnmount() {
        delete window.googlePlacesInstanceCount;
        delete window.isGoogleApiLoading;
        delete window.googlePlacesCallback;
        delete window.googlePlacesCallbackList;
    }

    render() {
        return (
            <div className="GooglePlaces">
                <PlacesAutocomplete
                    value={ this.state.address }
                    onChange={ this.handleChange.bind(this) }
                    onError={ this.handleError }
                    onSelect={ this.handleSelect }
                    googleCallbackName={ `googlePlacesCallback_${ this.googlePlacesInstanceId }` }
                    searchOptions={ this.props.searchOptions }
                >
                    { ({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <input
                                { ...getInputProps({
                                    placeholder: this.props.placeholder,
                                    className:   'location-search-input'
                                }) }
                            />
                            <ul className="autocomplete-dropdown-container">
                                { suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style     = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <li { ...getSuggestionItemProps(suggestion, { className, style }) }>
                                            <span>{ suggestion.description }</span>
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div>
                    ) }
                </PlacesAutocomplete>
            </div>

        );
    }
}

GooglePlaces.propTypes = {
    API_KEY:       PropTypes.string,
    placeholder:   PropTypes.string,
    searchOptions: PropTypes.object
};

export default GooglePlaces;