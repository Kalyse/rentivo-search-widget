import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '~components/shared/Dropdown/Dropdown'
import withController from './NestedDropdownController';
import withPreparedProps from './prepareProps';

import './NestedDropdown.scss';

class NestedDropdown extends React.PureComponent {
    render() {
        const DropdownHead = (
            <input type='text'
                   autoComplete='off'
                   autoCorrect='off'
                   autoCapitalize='off'
                   spellCheck={ false }
                   className='NestedDropdown__SearchInput'
                   placeholder={ this.props.placeholder }
                   value={ this.props.searchInputValue }
                   onChange={ this.props.onSearchInputChange }
                   onFocus={ this.props.openDropdown }
            />
        );

        return (
            <div className="NestedDropdown">
                <Dropdown
                    head={ DropdownHead }
                    body={ this.props.children }
                    bodyAlign='left'
                    closeDropdown={ this.props.closeDropdown }
                    isOpen={ this.props.isOpen }
                />
            </div>
        )
    }
}

NestedDropdown.propTypes = {
    isOpen:              PropTypes.bool.isRequired,
    searchInputValue:    PropTypes.string.isRequired,
    placeholder:         PropTypes.string.isRequired,
    openDropdown:        PropTypes.func.isRequired,
    closeDropdown:       PropTypes.func.isRequired,
    onSearchInputChange: PropTypes.func.isRequired,
};

export default withPreparedProps(withController(NestedDropdown));
