import React from "react";
import PropTypes from 'prop-types';
import last from 'lodash/last'
import { ROOT_MENUS_ID } from '~core/constants';

import NestedMenu from './NestedMenu/NestedMenu';
import NestedMenuList from './NestedMenu/NestedMenuList';
import NestedMenuItem from './NestedMenu/NestedMenuItem';
import NestedMenuBackLink from './NestedMenu/NestedMenuBackLink';
import NestedMenuSearchResultsTitle from './NestedMenu/NestedMenuSearchResultsTitle';


const options = {
    'thailand':  {
        id:            'thailand',
        title:         'Thailand',
        currSubmenuId: null,
        nextSubmenuId: '1'
    },
    'indonesia': {
        id:            'indonesia',
        title:         'Indonesia',
        currSubmenuId: null,
        nextSubmenuId: '2'
    },
    'koh-samui': {
        id:            'koh-samui',
        title:         'Koh Samui',
        currSubmenuId: '1',
        nextSubmenuId: '3'
    },
    'phuket':    {
        id:            'phuket',
        title:         'Phuket',
        currSubmenuId: '1',
        nextSubmenuId: '4'
    },
    'bali':      {
        id:            'bali',
        title:         'Bali',
        currSubmenuId: '2',
        nextSubmenuId: '5'
    },
    'ban-tai':   {
        id:            'ban-tai',
        title:         'Ban Tai',
        currSubmenuId: '3',
        nextSubmenuId: null
    },
    'bang-por':  {
        id:            'bang-por',
        title:         'Bang Por',
        currSubmenuId: '3',
        nextSubmenuId: null
    },
    'koh-yao':   {
        id:            'koh-yao',
        title:         'Koh Yao',
        currSubmenuId: '4',
        nextSubmenuId: null
    },
    'sanur':     {
        id:            'sanur',
        title:         'Sanur',
        currSubmenuId: '5',
        nextSubmenuId: null
    },
    'ubud':      {
        id:            'ubud',
        title:         'Ubud',
        currSubmenuId: '5',
        nextSubmenuId: null
    },
};

const rootMenus = {
    'defaultRootMenu':   {
        id:        'defaultRootMenu',
        optionsId: ['thailand', 'indonesia'],
    },
    'searchResultsMenu': {
        id:        'searchResultsMenu',
        optionsId: Object.keys(options)
    }
};

const submenus = {
    '1': {
        id:            '1',
        optionsId:     ['koh-samui', 'phuket'],
        prevSubmenuId: null
    },
    '2': {
        id:            '2',
        optionsId:     ['bali'],
        prevSubmenuId: null
    },
    '3': {
        id:            '3',
        optionsId:     ['ban-tai', 'bang-por'],
        prevSubmenuId: '1'
    },
    '4': {
        id:            '4',
        optionsId:     ['koh-yao'],
        prevSubmenuId: '1'
    },
    '5': {
        id:            '5',
        optionsId:     ['sanur', 'ubud'],
        prevSubmenuId: '2'
    }
};

export default (NestedDropdown) => {
    class NestedDropdownController extends React.PureComponent {
        _getSubmenusChainByOptionId = optionId => {
            const { currSubmenuId } = options[optionId];
            return currSubmenuId ? this._getSubmenusChain(currSubmenuId) : [];
        };

        _getSubmenusChain = lastSubmenuId => {
            const submenusCain = [lastSubmenuId];

            if (submenus[lastSubmenuId].prevSubmenuId) {
                submenusCain.unshift(submenus[lastSubmenuId].prevSubmenuId);
                this._getSubmenusChain(submenusCain[0]);
            }

            return submenusCain;
        };

        state = {
            isDropdownOpen:    false,
            searchInputValue:  '',
            selectedOptionId:  '',
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
                selectedOptionId: '',
                openSubmenusId:   []
            });
        };

        handleItemSelect = optionId => {
            this.setState({
                searchInputValue:  options[optionId].title,
                selectedOptionId:  optionId,
                currentRootMenuId: ROOT_MENUS_ID.DEFAULT
            }, this.closeDropdown);
        };

        countMenuRows = () => {
            const rootMenuId = this.state.currentRootMenuId;
            const submenuId  = last(this.state.openSubmenusId);

            const rootMenuRowsCount = rootMenuId === ROOT_MENUS_ID.SEARCH_RESULTS
                ? this.getRootMenuOptions().length + 1
                : this.getRootMenuOptions().length;
            const submenuRowsCount  = submenuId ? submenus[submenuId].optionsId.length + 1 : 0;

            return submenuId ? submenuRowsCount : rootMenuRowsCount;
        };

        getRootMenuOptions = () => {
            switch (this.state.currentRootMenuId) {
                case ROOT_MENUS_ID.SEARCH_RESULTS:
                    return Object.values(options).filter(option => {
                        return option.title.toLowerCase().includes(this.state.searchInputValue.toLowerCase())
                    });
                case ROOT_MENUS_ID.DEFAULT:
                default:
                    return rootMenus[ROOT_MENUS_ID.DEFAULT].optionsId.map(optionId => options[optionId]);
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
                        { Object.values(submenus).map(submenu => (
                            <NestedMenuList
                                key={ submenu.id }
                                isSubmenu
                                isOpen={ this.state.openSubmenusId.includes(submenu.id) }
                                isCurrent={ last(this.state.openSubmenusId) === submenu.id }
                            >
                                <NestedMenuBackLink onBackClick={ this.closeCurrentSubmenu.bind(this, submenu.id) }/>
                                { Object.values(options)
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
        placeholder: PropTypes.string.isRequired,
    };

    NestedDropdownController.defaultProps = {
        placeholder: 'Where do you want to go?'
    };

    return NestedDropdownController;
}