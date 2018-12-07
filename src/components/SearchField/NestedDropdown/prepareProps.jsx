import React from 'react';
import PropTypes from 'prop-types';
import { WidgetConsumer } from '~components/Searchbar/SearchbarController';

import { ROOT_MENUS_ID } from '~core/constants';

export default (NestedDropdown) => {
    class NestedDropdownWrapper extends React.PureComponent {
        generateUrlPart       = () => this.props.forwardedRef.current.generateUrlPart();
        generateCustomUrlPart = () => this.props.forwardedRef.current.generateCustomUrlPart();

        _getNormalizedOptions = (data = this.props.data.children, options = {}) => {
            data.forEach(option => {
                const optionId           = `option-${ option.pathFragment }`;
                const nextSubmenuId      = option.children ? `submenu-${ option.pathFragment }` : null;
                const customWidgetConfig = option.customWidgetConfig ? option.customWidgetConfig : null;

                options[optionId] = {
                    id:           optionId,
                    title:        option.name,
                    pathFragment: option.pathFragment,
                    nextSubmenuId,
                    customWidgetConfig
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
                    id:           ROOT_MENUS_ID.SEARCH_RESULTS,
                    pathFragment: this.props.data.pathFragment,
                    optionsId:    Object.keys(this._getNormalizedOptions())
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
                placeholder: this.props.placeholder,
                dumb:        this.props.dumb
            };
        };

        render() {
            return (
                <WidgetConsumer>
                    { (context) => (
                        <NestedDropdown
                            context={ context }
                            ref={ this.props.forwardedRef }
                            { ...this.normalizeData() }
                        />
                    ) }
                </WidgetConsumer>
            );
        }
    }

    NestedDropdownWrapper.propTypes = {
        menuTitlePrefix: PropTypes.string,
        placeholder:     PropTypes.string,
        data:            PropTypes.shape({
            name:         PropTypes.string.isRequired,
            pathFragment: PropTypes.string.isRequired,
            children:     PropTypes.array.isRequired
        }).isRequired,
        dumb:            PropTypes.bool
    };

    NestedDropdownWrapper.defaultProps = {
        menuTitlePrefix: 'All villas in ',
        placeholder:     'Where do you want to go?',
        dumb:            false

    };

    return React.forwardRef((props, ref) => {
        return <NestedDropdownWrapper { ...props } forwardedRef={ ref }/>;
    });
};
