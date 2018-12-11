import React from 'react';
import PropTypes from 'prop-types';

import './PlusMinusDropdownHead.scss';

const PlusMinusDropdownHead = ({
    onHeadClick,
    results,
    placeholder
}) => (
    <div className="PlusMinusDropdownHead" onClick={ onHeadClick }>
        { results.length
            ? results.map((result, idx, array) => (
                <span className="PlusMinusDropdownHead__Result" key={ result.id }>
                    { `${ result.value } ${ (result.value === 1 && result.titleSingular) ? result.titleSingular : result.title }${ idx + 1 < array.length ? ',' : '' }` }
                </span>
            ))
            : <span className="PlusMinusDropdownHead__Placeholder">{ placeholder }</span>
        }
    </div>
);

PlusMinusDropdownHead.propTypes = {
    onHeadClick: PropTypes.func.isRequired,
    results:     PropTypes.arrayOf(
        PropTypes.shape({
            id:             PropTypes.string.isRequired,
            title:          PropTypes.string.isRequired,
            titleSingular:  PropTypes.string,
            value:          PropTypes.number.isRequired
        })
    ).isRequired,
    placeholder: PropTypes.string.isRequired
};

export default PlusMinusDropdownHead;
//${ (results.value === 1) ? result.titleSingular : result.title }
