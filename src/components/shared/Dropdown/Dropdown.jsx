import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Dropdown.scss';

class Dropdown extends React.PureComponent {
    DropdownRef = React.createRef();

    handleOutsideClick = (e) => {
        const target       = e.target;
        const dropdownNode = this.DropdownRef.current;
        if (!dropdownNode.contains(target) && this.props.isOpen) {
            this.props.closeDropdown();
        }

    };

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
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
    isOpen:        PropTypes.bool.isRequired,
    head:          PropTypes.element.isRequired,
    body:          PropTypes.element.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    bodyAlign:     PropTypes.oneOf(['left', 'right']).isRequired,
};

Dropdown.defaultProps = {
    bodyAlign: 'left',
};

export default Dropdown;
