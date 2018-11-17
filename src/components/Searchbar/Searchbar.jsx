import React from 'react';
import PropTypes from 'prop-types';

import withController from './SearchbarController';
import './Searchbar.scss';

const Searchbar = ({
    firstCol,
    secondCol,
    thirdCol,
    fourthCol,
    sizeClassNames,
    searchbarRef
}) => (
    <form className={ `Searchbar ${ sizeClassNames }` } ref={ searchbarRef }>
        <div className="l-container">
            <div className="l-grid">
                <div className="l-col--searchField">{ firstCol }</div>
                <div className="l-col--datesFields">{ secondCol }</div>
                <div className="l-col--guestsField">{ thirdCol }</div>
                <div className="l-col--submitBtn">{ fourthCol }</div>
            </div>
        </div>
    </form>
);

Searchbar.propTypes = {
    firstCol:  PropTypes.element.isRequired,
    secondCol: PropTypes.element.isRequired,
    thirdCol:  PropTypes.element.isRequired,
    fourthCol: PropTypes.element.isRequired
};

export default withController(React.memo(Searchbar));