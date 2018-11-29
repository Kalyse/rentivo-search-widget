import React from 'react';
import PropTypes from 'prop-types';

import { ROOT_MENUS_ID } from '~core/constants';

export default (NestedDropdown) => {
    class NestedDropdownWrapper extends React.PureComponent {
        _getNormalizedOptions = (data = this.props.data.children, options = {}) => {
            data.forEach(option => {
                const optionId      = `option-${ option.pathFragment }`;
                const nextSubmenuId = option.children ? `submenu-${ option.pathFragment }` : null;

                options[optionId] = {
                    id:    optionId,
                    title: option.name,
                    nextSubmenuId
                };

                if (option.children) {
                    this._getNormalizedOptions(option.children, options);
                }
            });

            return options;
        };

        _getNormalizedRootMenus = () => {
            return {
                [ROOT_MENUS_ID.DEFAULT]:        {
                    id:           ROOT_MENUS_ID.DEFAULT,
                    title:        this.props.menuTitlePrefix + this.props.data.name,
                    pathFragment: this.props.data.pathFragment,
                    optionsId:    this.props.data.children.map(({ pathFragment }) => `option-${ pathFragment }`),
                },
                [ROOT_MENUS_ID.SEARCH_RESULTS]: {
                    id:        ROOT_MENUS_ID.SEARCH_RESULTS,
                    optionsId: Object.keys(this._getNormalizedOptions())
                }
            };
        };

        _getNormalizedSubmenus = (data = this.props.data, level = 0, submenus = {}, prevSubmenuId = null) => {
            if (data.children) {
                const submenuId = `submenu-${ data.pathFragment }`;

                if (level > 0) {
                    submenus[submenuId] = {
                        id:           submenuId,
                        title:        this.props.menuTitlePrefix + data.name,
                        pathFragment: data.pathFragment,
                        optionsId:    data.children.map(({ pathFragment }) => `option-${ pathFragment }`),
                        prevSubmenuId
                    };

                    prevSubmenuId = submenuId;
                }

                data.children.forEach(data => {
                    this._getNormalizedSubmenus(data, level + 1, submenus, prevSubmenuId)
                });
            }

            return submenus;
        };

        normalizeData = () => {
            return {
                options:     this._getNormalizedOptions(),
                rootMenus:   this._getNormalizedRootMenus(),
                submenus:    this._getNormalizedSubmenus(),
                placeholder: this.props.placeholder
            };
        };

        render() {
            return <NestedDropdown { ...this.normalizeData() }/>;
        }
    }

    NestedDropdownWrapper.propTypes = {
        menuTitlePrefix: PropTypes.string,
        placeholder:     PropTypes.string,
        data:            PropTypes.shape({
            name:         PropTypes.string,
            pathFragment: PropTypes.string,
            children:     PropTypes.array
        })
    };

    NestedDropdownWrapper.defaultProps = {
        menuTitlePrefix: 'All villas in ',
        placeholder:     'Where do you want to go?',

    };

    return NestedDropdownWrapper;
};
