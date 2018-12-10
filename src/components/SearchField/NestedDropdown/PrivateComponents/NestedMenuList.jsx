import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";

import './NestedMenuList.scss'

const NestedMenuList = ({
    isSubmenu,
    isOpen,
    isCurrent,
    children
}) => {
    const ListClassNames = classnames('NestedMenuList', {
        'NestedMenuList--submenu': isSubmenu,
        'is-open':                 isOpen,
        'is-current':              isCurrent,
    });

    return (
        <ul className={ ListClassNames }>{ children }</ul>
    );
};

export default React.memo(NestedMenuList);