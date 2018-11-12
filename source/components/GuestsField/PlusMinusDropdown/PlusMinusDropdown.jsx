import React from 'react';
import PropTypes from 'prop-types';

import withController from './PlusMinusDropdownController';
import withPreparedProps from './prepareProps';

import './PlusMinusDropdown.scss';

class PlusMinusDropdown extends React.PureComponent {
    DropdownRef = React.createRef();

    closeDropdownByDocumentClick = (e) => {
        const target      = e.target;
        const dropdown    = this.DropdownRef.current;
        const itsDropdown = target === dropdown || dropdown.contains(target);
        if (!itsDropdown && this.props.isOpen)
            this.props.toggleDropdown();
    };

    componentDidMount() {
        document.addEventListener('click', this.closeDropdownByDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdownByDocumentClick);
    }

    render() {
        return (
            <div
                className={ `PlusMinusDropdown ${ this.props.isOpen ? "PlusMinusDropdown--open" : "" }` }
                ref={ this.DropdownRef }
            >
                <div
                    className="PlusMinusDropdown__Results"
                    tabIndex="0"
                    onClick={ this.props.toggleDropdown }
                >{ this.props.results.length
                    ? this.props.results.map((category, idx, array) => (
                        <span className="PlusMinusDropdown__Result" key={ category.id }>
                            { `${category.value} ${category.title}${ idx + 1 < array.length ? ',' : '' }` }
                        </span>
                    ))
                    : <span className="PlusMinusDropdown__Placeholder">{ this.props.placeholder }</span>
                }</div>
                { this.props.isOpen && (
                    <div className="PlusMinusDropdown__OptionsContainer">{ this.props.children }</div>
                ) }
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