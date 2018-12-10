import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import './NestedMenuItem.scss'

const NestedMenuItem = ({
    onNextSubmenuClick,
    onItemSelect,
    isSelected,
    isNextSubmenuSelected,
    title
}) => {
    const ItemClassNames = classnames('NestedMenuItem', {
        'is-selected': isSelected
    });

    const NextSubmenuLinkClassNames = classnames('icon-right-open', {
        'is-selected': isNextSubmenuSelected
    });

    return (
        <li className={ ItemClassNames }>
            <span onClick={ onItemSelect }>{ title }</span>
            { onNextSubmenuClick && (
                <i className={ NextSubmenuLinkClassNames } onClick={ onNextSubmenuClick }/>
            ) }
        </li>
    );
};

export default React.memo(NestedMenuItem);