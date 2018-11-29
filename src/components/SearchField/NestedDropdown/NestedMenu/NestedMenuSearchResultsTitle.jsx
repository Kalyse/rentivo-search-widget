import React from 'react';

import './NestedMenuSearchResultsTitle.scss';

const NestedMenuSearchResultsTitle = ({
    resultsCount
}) => <li className='NestedMenuSearchResultsTitle'>{ resultsCount > 0 ? 'All Results:' : 'No results found' }</li>;

export default React.memo(NestedMenuSearchResultsTitle);