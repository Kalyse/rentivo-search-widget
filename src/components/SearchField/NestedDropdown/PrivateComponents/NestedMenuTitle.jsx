import React from 'react';

import './NestedMenuTitle.scss';

const NestedMenuTitle = ({ text }) => <li className='NestedMenuTitle'>{ text }:</li>;

export default React.memo(NestedMenuTitle);