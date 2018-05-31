import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import Searchbar from './components/Searchbar';

// Webpack hot reload
if (module.hot) {
    module.hot.accept();
}

($ => {
    $.fn.rentivoSearchbar = function ({
        searchSchema,
        guestsSchema = Searchbar.defaultProps.guestsField.guestsSchema,
        baseUrl = Searchbar.defaultProps.baseUrl
    }) {
        return this.each(function() {
            const searchbarProps = {
                searchField: {
                    ...Searchbar.defaultProps.searchField,
                    searchSchema
                },
                guestsField: {
                    ...Searchbar.defaultProps.guestsField,
                    guestsSchema
                },
                baseUrl
            };

            ReactDOM.render(
                <Searchbar { ...searchbarProps } />,
                this
            );
        });
    }
})(jQuery);
