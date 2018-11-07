import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Searchbar from './components/Searchbar/Searchbar';

// Webpack hot reload
if (module.hot) {
    module.hot.accept();
}

($ => {
    $.fn.rentivoSearchbar = function ( config ) {
        return this.each(function() {
            ReactDOM.render(
                <Searchbar { ...config } />,
                this
            );
        });
    }
})(jQuery);

// for testing during the developing with working hot module replacement. Not passing to the build
if (process.env.NODE_ENV === 'development') {
    const searchFieldConfig__singleSelectBox = require('./stories/jsonExamples/searchField--singleSelectBox');
    const searchFieldConfig__multiSelectBox = require('./stories/jsonExamples/searchField--multiSelectBox');
    const searchFieldConfig__googlePlaces = require('./stories/jsonExamples/searchField--googlePlaces');

    const datesFieldsConfig = require('./stories/jsonExamples/datesFields');

    const guestsFieldConfig__singleSelectBox = require('./stories/jsonExamples/guestsField--singleSelectBox');


    $(function () {
        $('#root').rentivoSearchbar({
            baseUrl: 'http://localhost:3000/',
            appendString: "?aff=123",
            searchField: { ...searchFieldConfig__singleSelectBox },
            datesFields: { ...datesFieldsConfig },
            guestsField: { ...guestsFieldConfig__singleSelectBox }
        });
    });

}
