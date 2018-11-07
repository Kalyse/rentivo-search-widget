import React from 'react';
import PropTypes from 'prop-types';

import plusMinusWrapper from './plusMinusWrapper';
import PlusMinusControls from './PlusMinusControls/PlusMinusControls';

import './PlusMinus.scss';

class PlusMinus extends React.PureComponent {
    PlusMinusRef = React.createRef();

    _getInitStateOptions = () => {
        const options = {};
        Object
            .keys(this.props.options)
            .forEach(key => {
                const { minNumber } = this.props.options[key];
                options[key]        = minNumber >= 0 ? minNumber : 0;
            });
        return options;
    };

    _getActiveCategories = () => {
        const activeOptions    = {};
        const activeCategories = [];

        Object.entries(this.state.options)
            .filter(([, optValue]) => optValue > 0)
            .forEach(([optKey, optValue]) => activeOptions[optKey] = optValue);

        Object.values(this.props.categories)
            .filter((catValue) => catValue.optionsId.some(option => Object.keys(activeOptions).includes(option)))
            .sort((prevCatValue, nextCatValue) => prevCatValue.order - nextCatValue.order)
            .forEach(catValue => {
                activeCategories.push({
                    id:    catValue.id,
                    title: catValue.title,
                    value: Object.entries(activeOptions)
                               .filter(([optKey]) => catValue.optionsId.includes(optKey))
                               .reduce((accumulator, [, currentVal]) => accumulator + currentVal, 0)
                });
            });

        return activeCategories;
    };

    state = {
        options:        this._getInitStateOptions(),
        isDropdownOpen: false
    };

    isIncreaseBtnDisabled = optionId => this.state.options[optionId] >= this.props.options[optionId].maxNumber;
    isDecreaseBtnDisabled = optionId => this.state.options[optionId] <= this.props.options[optionId].minNumber;

    handleOptionIncrease = optionId => {
        if (this.isIncreaseBtnDisabled(optionId)) return;

        this.setState({
            options: {
                ...this.state.options,
                [optionId]: this.state.options[optionId] + 1
            }
        });
    };
    handleOptionDecrease = optionId => {
        if (this.isDecreaseBtnDisabled(optionId)) return;

        this.setState({
            options: {
                ...this.state.options,
                [optionId]: this.state.options[optionId] - 1
            }
        });
    };

    toggleDropdown = () => this.setState({ isDropdownOpen: !this.state.isDropdownOpen });

    closeDropdownByDocumentClick = (e) => {
        const target           = e.target;
        const plusMinusNode    = this.PlusMinusRef.current;
        const itsPlusMinusNode = target === plusMinusNode || plusMinusNode.contains(target);
        if (!itsPlusMinusNode && this.state.isDropdownOpen)
            this.toggleDropdown();
    };

    componentDidMount() {
        document.addEventListener('click', this.closeDropdownByDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdownByDocumentClick);
    }

    render() {
        const activeCategories = this._getActiveCategories();

        return (
            <div
                className={ `PlusMinus ${ this.state.isDropdownOpen ? "PlusMinus--open" : "" }` }
                ref={ this.PlusMinusRef }
            >
                <div
                    className="PlusMinus__ActiveCategories"
                    tabIndex="0"
                    onClick={ (e) => {
                        e.stopPropagation();
                        this.toggleDropdown();
                    } }
                >{ activeCategories.length
                    ? activeCategories.map((category, idx) => (
                        <span className="PlusMinus__ActiveCategory" key={ category.id }>
                            { `${category.value} ${category.title}${ idx + 1 < activeCategories.length ? ',' : '' }` }
                        </span>
                    ))
                    : <span className="PlusMinus__Placeholder">{ this.props.placeholder }</span>
                }</div>
                <div className="PlusMinus__Dropdown">
                    <ul className="PlusMinus__Options">
                        { Object.values(this.props.options).map((option) => (
                            <li key={ option.id } className="PlusMinus__Option">
                                <span className="PlusMinus__Option__Title">
                                    { this.state.options[option.id] } { option.title }
                                </span>
                                <span className="PlusMinus__Option__Controls">
                                    <PlusMinusControls
                                        onIncrease={ this.handleOptionIncrease.bind(this, option.id) }
                                        onDecrease={ this.handleOptionDecrease.bind(this, option.id) }
                                        increaseBtnDisabled={ this.isIncreaseBtnDisabled(option.id) }
                                        decreaseBtnDisabled={ this.isDecreaseBtnDisabled(option.id) }
                                    />
                                </span>
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        );
    }
}

PlusMinus.propTypes = {
    categories:  PropTypes.shape({
        id:        PropTypes.string,
        title:     PropTypes.string,
        order:     PropTypes.number,
        optionsId: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    options:     PropTypes.shape({
        id:         PropTypes.string,
        title:      PropTypes.string,
        minNumber:  PropTypes.number,
        maxNumber:  PropTypes.number,
        categoryId: PropTypes.string
    }).isRequired,
    placeholder: PropTypes.string
};

PlusMinus.defaultProps = {
    placeholder: "Select guests number"
};

export default plusMinusWrapper(PlusMinus);