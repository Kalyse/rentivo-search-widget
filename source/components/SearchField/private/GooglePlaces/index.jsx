import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import loadGoogleMapsAPI from 'load-google-maps-api-2';

import { generateGooglePlacesPart } from '~core/helpers/prepareSubmitUrl';

import './style.scss';

export default class GooglePlaces extends React.PureComponent {
    searchField = React.createRef();

    state = {
        address: '',
        searchResultData: ''
    };

    generateUrlPart = () => generateGooglePlacesPart(this.state.searchResultData);

    handleChange = address => {
        this.setState({ address });
    };

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

    componentDidMount() {
        loadGoogleMapsAPI({
            key: this.props.API_KEY,
            libraries: [ 'places' ],
            language: 'en'
        }).then(window.GooglePlacesCallback)
    }

    render() {
        return (
            <div className="GooglePlaces">
                <PlacesAutocomplete
                    value={ this.state.address }
                    onChange={ this.handleChange }
                    onSelect={ this.handleSelect }
                    googleCallbackName="GooglePlacesCallback"
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: this.props.placeholder,
                                    className: 'location-search-input'
                                })}
                            />
                            <ul className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <li {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>

        );
    }
}

GooglePlaces.propTypes = {
    API_KEY: PropTypes.string,
    placeholder:  PropTypes.string,
    mode: PropTypes.string
};
