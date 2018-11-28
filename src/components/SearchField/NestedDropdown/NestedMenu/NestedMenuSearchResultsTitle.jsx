import React from 'react';
import PropTypes from 'prop-types';

import './NestedMenuSearchResultsTitle.scss';

const NestedMenuSearchResultsTitle = ({
    resultsCount
}) => {
    return (
        <li
            className='NestedMenuSearchResultsTitle'
        >{ resultsCount > 0 ? 'All Results:' : 'No results found' }</li>
    );
};

export default React.memo(NestedMenuSearchResultsTitle);