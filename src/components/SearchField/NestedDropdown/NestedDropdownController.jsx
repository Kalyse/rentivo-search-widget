import React from "react";
import PropTypes from 'prop-types';
import last from 'lodash/last'
import { ROOT_MENUS_ID } from '~core/constants';

import NestedMenu from './NestedMenu/NestedMenu';
import NestedMenuList from './NestedMenu/NestedMenuList';
import NestedMenuItem from './NestedMenu/NestedMenuItem';
import NestedMenuTitle from './NestedMenu/NestedMenuTitle';
import NestedMenuBackLink from './NestedMenu/NestedMenuBackLink';
import NestedMenuSearchResultsTitle from './NestedMenu/NestedMenuSearchResultsTitle';

export default (NestedDropdown) => {
    class NestedDropdownController extends React.PureComponent {
        _getSubmenusChainByOptionId = optionId => {
            const currSubmenu = Object.values(this.props.submenus).find(({ optionsId }) => optionsId.includes(optionId));
            return currSubmenu ? this._getSubmenusChain(currSubmenu.id) : [];
        };

        _getSubmenusChain = lastSubmenuId => {
            const submenusCain = [lastSubmenuId];

            if (this.props.submenus[lastSubmenuId].prevSubmenuId) {
                submenusCain.unshift(this.props.submenus[lastSubmenuId].prevSubmenuId);
                this._getSubmenusChain(submenusCain[0]);
            }

            return submenusCain;
        };

        state = {
            isDropdownOpen:    false,
            searchInputValue:  '',
            selectedOptionId:  null,
            currentRootMenuId: ROOT_MENUS_ID.DEFAULT,
            openSubmenusId:    [],
        };

        openDropdown  = () => this.setState({ isDropdownOpen: true });
        closeDropdown = () => {
            const openSubmenusId = this.state.selectedOptionId
                ? this._getSubmenusChainByOptionId(this.state.selectedOptionId)
                : [];

            this.setState({
                isDropdownOpen: false,
                openSubmenusId
            })
        };


        openSubmenu         = submenuId => this.setState({
            openSubmenusId: [...this.state.openSubmenusId, submenuId]
        });
        closeCurrentSubmenu = submenuId => this.setState({
            openSubmenusId: this.state.openSubmenusId.filter(openSubmenuId => openSubmenuId !== submenuId)
        });

        handleSearchInputChange = e => {
            const searchInputValue  = e.target.value;
            const currentRootMenuId = searchInputValue.length > 0
                ? ROOT_MENUS_ID.SEARCH_RESULTS
                : ROOT_MENUS_ID.DEFAULT;

            this.setState({
                searchInputValue,
                currentRootMenuId,
                selectedOptionId: null,
                openSubmenusId:   []
            });
        };

        handleItemSelect = optionId => {
            this.setState({
                searchInputValue:  this.props.options[optionId].title,
                selectedOptionId:  optionId,
                currentRootMenuId: ROOT_MENUS_ID.DEFAULT
            }, this.closeDropdown);
        };

        countMenuRows = () => {
            let rowsNum     = 0;
            const submenuId = last(this.state.openSubmenusId);

            if (submenuId) {
                rowsNum = this.props.submenus[submenuId].optionsId.length + 2; // +2 - back link and menu title
            } else {
                rowsNum = this.getRootMenuOptions().length + 1; // +1 - menu title or search results title
            }

            return rowsNum;
        };

        getRootMenuOptions = () => {
            switch (this.state.currentRootMenuId) {
                case ROOT_MENUS_ID.SEARCH_RESULTS:
                    return Object.values(this.props.options).filter(option => {
                        return option.title.toLowerCase().includes(this.state.searchInputValue.toLowerCase())
                    });
                case ROOT_MENUS_ID.DEFAULT:
                default:
                    return this.props.rootMenus[ROOT_MENUS_ID.DEFAULT].optionsId.map(optionId => this.props.options[optionId]);
            }
        };

        checkNextSubmenuSelected = nextSubmenuId => {
            const { selectedOptionId } = this.state;
            return selectedOptionId && this._getSubmenusChainByOptionId(selectedOptionId).includes(nextSubmenuId);
        };

        render() {
            return (
                <NestedDropdown
                    placeholder={ this.props.placeholder }
                    openDropdown={ this.openDropdown }
                    closeDropdown={ this.closeDropdown }
                    isOpen={ this.state.isDropdownOpen }
                    searchInputValue={ this.state.searchInputValue }
                    onSearchInputChange={ this.handleSearchInputChange }
                >
                    <NestedMenu rows={ this.countMenuRows() }>
                        <NestedMenuList
                            key={ this.state.currentRootMenuId }
                            isOpen
                            isCurrent={ !this.state.openSubmenusId.length }
                        >
                            { this.state.currentRootMenuId === ROOT_MENUS_ID.SEARCH_RESULTS &&
                              <NestedMenuSearchResultsTitle resultsCount={ this.getRootMenuOptions().length }/>
                            }
                            { this.props.rootMenus[this.state.currentRootMenuId].title &&
                              <NestedMenuTitle text={ this.props.rootMenus[this.state.currentRootMenuId].title }/> }
                            { this.getRootMenuOptions().map(option => (
                                <NestedMenuItem
                                    key={ option.id }
                                    onNextSubmenuClick={ option.nextSubmenuId &&
                                                         this.openSubmenu.bind(this, option.nextSubmenuId) }
                                    title={ option.title }
                                    onItemSelect={ this.handleItemSelect.bind(this, option.id) }
                                    isSelected={ option.id === this.state.selectedOptionId }
                                    isNextSubmenuSelected={ this.checkNextSubmenuSelected(option.nextSubmenuId) }
                                />
                            )) }
                        </NestedMenuList>
                        { Object.values(this.props.submenus).map(submenu => (
                            <NestedMenuList
                                key={ submenu.id }
                                isSubmenu
                                isOpen={ this.state.openSubmenusId.includes(submenu.id) }
                                isCurrent={ last(this.state.openSubmenusId) === submenu.id }
                            >
                                <NestedMenuBackLink onBackClick={ this.closeCurrentSubmenu.bind(this, submenu.id) }/>
                                { submenu.title && <NestedMenuTitle text={ submenu.title }/> }
                                { Object.values(this.props.options)
                                    .filter(option => submenu.optionsId.includes(option.id))
                                    .map(option => (
                                        <NestedMenuItem
                                            key={ option.id }
                                            onNextSubmenuClick={ option.nextSubmenuId &&
                                                                 this.openSubmenu.bind(this, option.nextSubmenuId) }
                                            title={ option.title }
                                            onItemSelect={ this.handleItemSelect.bind(this, option.id) }
                                            isSelected={ option.id === this.state.selectedOptionId }
                                            isNextSubmenuSelected={ this.checkNextSubmenuSelected(option.nextSubmenuId) }
                                        />
                                    )) }
                            </NestedMenuList>
                        )) }
                    </NestedMenu>
                </NestedDropdown>
            );
        }
    }

    NestedDropdownController.propTypes = {
        options:     PropTypes.object.isRequired,
        rootMenus:   PropTypes.object.isRequired,
        submenus:    PropTypes.object.isRequired,
        placeholder: PropTypes.string.isRequired,
    };

    return NestedDropdownController;
}