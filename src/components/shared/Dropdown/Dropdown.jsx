import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Dropdown.scss';

class Dropdown extends React.PureComponent {
    DropdownRef = React.createRef();

    closeDropdownByDocumentClick = (e) => {
        const target       = e.target;
        const dropdownNode = this.DropdownRef.current;
        const itsDropdown  = target === dropdownNode || dropdownNode.contains(target);
        if (!itsDropdown && this.props.isOpen) {
            console.log(target);
            this.props.toggleDropdown();
        }

    };

    componentDidMount() {
        document.addEventListener('click', this.closeDropdownByDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdownByDocumentClick);
    }

    render() {
        const dropDownClassNames = classnames('RSW-Dropdown', {
            'RSW-Dropdown--open': this.props.isOpen
        });
        const headClassNames     = classnames('RSW-Dropdown__Head');
        const bodyClassNames     = classnames('RSW-Dropdown__Body', {
            'RSW-Dropdown__Body--left':  this.props.bodyAlign === 'left',
            'RSW-Dropdown__Body--right': this.props.bodyAlign === 'right'
        });

        return (
            <div
                className={ dropDownClassNames }
                ref={ this.DropdownRef }
                tabIndex="0"
            >
                <div className={ headClassNames }>{ this.props.head }</div>
                { this.props.isOpen && (
                    <div className={ bodyClassNames }>{ this.props.body }</div>
                ) }
            </div>
        )
    }
}

Dropdown.propTypes = {
    isOpen:         PropTypes.bool.isRequired,
    head:           PropTypes.element.isRequired,
    body:           PropTypes.element.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    bodyAlign:      PropTypes.oneOf(['left', 'right']).isRequired,
};

Dropdown.defaultProps = {
    bodyAlign: 'left',
    withArrow: true,
};

export default Dropdown;
