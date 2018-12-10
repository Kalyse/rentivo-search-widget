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
