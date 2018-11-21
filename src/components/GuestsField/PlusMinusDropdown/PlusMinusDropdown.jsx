import React from 'react';
import PropTypes from 'prop-types';

import withController from './PlusMinusDropdownController';
import withPreparedProps from './prepareProps';

import Dropdown from '~components/shared/Dropdown/Dropdown'

import './PlusMinusDropdown.scss';

class PlusMinusDropdown extends React.PureComponent {
    render() {
        const DropdownHead = (
            <div className="PlusMinusDropdown__ResultsContainer" onClick={ this.props.toggleDropdown }>
                { this.props.results.length
                    ? this.props.results.map((result, idx, array) => (
                        <span className="PlusMinusDropdown__Result" key={ result.id }>
                            { `${result.value} ${result.title}${ idx + 1 < array.length ? ',' : '' }` }
                        </span>
                    ))
                    : <span className="PlusMinusDropdown__Placeholder">{ this.props.placeholder }</span>
                }
            </div>
        );
        const DropdownBody = <div className="PlusMinusDropdown__OptionsContainer">{ this.props.children }</div>;

        return (
            <div className="PlusMinusDropdown">
                <Dropdown
                    head={ DropdownHead }
                    body={ DropdownBody }
                    bodyAlign='right'
                    toggleDropdown={ this.props.toggleDropdown }
                    isOpen={ this.props.isOpen }
                />
            </div>
        )
    }
}

PlusMinusDropdown.propTypes = {
    isOpen:         PropTypes.bool.isRequired,
    results:        PropTypes.array.isRequired,
    placeholder:    PropTypes.string.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
};

export default withPreparedProps(withController(PlusMinusDropdown));