import React from 'react';
import PropTypes from 'prop-types';

import withController from './PlusMinusDropdownController';
import withPreparedProps from './prepareProps';

import Dropdown from '~components/shared/Dropdown/Dropdown'

import './PlusMinusDropdown.scss';

class PlusMinusDropdown extends React.PureComponent {
    render() {
        const DropdownBody = <div className="PlusMinusDropdown__OptionsContainer">{ this.props.children }</div>;

        return (
            <div className="PlusMinusDropdown">
                <Dropdown
                    head={ this.props.DropdownHead }
                    body={ DropdownBody }
                    bodyAlign='right'
                    closeDropdown={ this.props.toggleDropdown }
                    isOpen={ this.props.isOpen }
                />
            </div>
        )
    }
}

PlusMinusDropdown.propTypes = {
    isOpen:         PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    DropdownHead:   PropTypes.element.isRequired,
};

export default withPreparedProps(withController(PlusMinusDropdown));