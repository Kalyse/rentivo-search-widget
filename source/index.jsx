import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash.merge';

import Searchbar from './containers/Searchbar';

// Webpack hot reload
if (module.hot) {
    module.hot.accept();
}

($ => {
    const searchFieldModesDefaults = {
        SingleSelectBox: {
            placeholder: 'Where do you want to go?',
            initialValue: 'TU'
        },
        MultiSelectBox: {
            placeholder: 'Where do you want to go?',
            initialValue: [],
        },
        GooglePlaces: {
            placeholder: 'Search Places ...',
            componentRestrictions: {}
        },
    };

    const defaultConfig = {
        baseUrl: `${ window.location.protocol }//${ window.location.host }`,
        appendString: '',
        searchField: {
            mode: 'SingleSelectBox'
        },
        datesFields: {
            startDateId:      'checkIn',
            endDateId:        'checkOut',
            initialStartDate: null,
            initialEndDate:   null,
            dateFormat:       'DD/MM/YYYY',
            appendToBody:     true
        },
        guestsField: {
            guestsSchema: require('~core/jsonDataExamples/guestsSchema.json'),
            initialValue: '1',
        }
    };

    $.fn.rentivoSearchbar = function ( config ) {
        const searchbarProps = merge(defaultConfig, config);
        const searchFieldMode = searchbarProps.searchField.mode;
        const searchFieldConfig = merge(searchFieldModesDefaults[searchFieldMode], searchbarProps.searchField);
        
        searchbarProps.searchField = { ...searchFieldConfig };

        return this.each(function() {
            ReactDOM.render(
                <Searchbar { ...searchbarProps } />,
                this
            );
        });
    }
})(jQuery);

// for testing during the developing with working hot module replacement. Not passing to the build
if (process.env.NODE_ENV === 'development') {
    const searchSchema__multiSelectBox = require('~core/jsonDataExamples/searchSchema--multiSelectBox.json');
    const searchSchema__singleSelectBox = require('~core/jsonDataExamples/searchSchema--singleSelectBox.json');
    const guestsSchema = require('~core/jsonDataExamples/guestsSchema.json');

    // searchField config examples

    const searchField__singleSelectBox = {
        mode: 'SingleSelectBox',
        searchSchema: searchSchema__singleSelectBox
    };

    const searchField__multiSelectBox = {
        mode: 'MultiSelectBox',
        searchSchema: searchSchema__multiSelectBox
    };

    const searchField__googlePlaces = {
        mode: 'GooglePlaces',
        API_KEY: 'AIzaSyAzoHVEPS9zt7mK97TL9TTZJjYi-RCPPgE',
        componentRestrictions: {
            country: 'uk'
        }
    };


    $(function () {
        $('#root').rentivoSearchbar({
            baseUrl: 'http://localhost:3000/',
            appendString: "?aff=123",
            searchField: searchField__googlePlaces,
            guestsField: {
                guestsSchema,
                initialValue: guestsSchema.categoryValue[0].itemValue
            }
        });
    });

}
