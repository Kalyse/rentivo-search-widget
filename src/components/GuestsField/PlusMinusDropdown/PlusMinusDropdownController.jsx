import React from 'react';
import PropTypes from 'prop-types';

import { generatePlusMinusDropdownPart } from './helpers/urlGenerator';

import PlusMinusOption from "./PlusMinusOption/PlusMinusOption";
import PlusMinusControls from "./PlusMinusControls/PlusMinusControls";

export default (PlusMinusDropdown) => {
    class PlusMinusDropdownController extends React.PureComponent {
        _getInitStateOptions = () => {
            const options = {};

            Object.keys(this.props.options).forEach(key => {
                const { minNumber } = this.props.options[key];
                options[key]        = minNumber >= 0 ? minNumber : 0;
            });

            return options;
        };

        state = {
            options:        this._getInitStateOptions(),
            isDropdownOpen: false
        };

        generateUrlPart = generatePlusMinusDropdownPart.bind(this);

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

        getActiveEntities = (entityType) => {
            const activeOptions    = {};
            const activeCategories = [];

            Object.entries(this.state.options)
                .filter(([, optValue]) => optValue > 0)
                .forEach(([optKey, optValue]) => activeOptions[optKey] = optValue);

            Object.values(this.props.categories)
                .filter(({ optionsId }) => optionsId.some(option => Object.keys(activeOptions).includes(option)))
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

            switch (entityType) {
                case 'options':
                    return activeOptions;
                case 'categories':
                    return activeCategories;
                default:
                    return { activeOptions, activeCategories }
            }
        };

        render() {
            return (
                <PlusMinusDropdown
                    placeholder={ this.props.placeholder }
                    results={ this.getActiveEntities('categories') }
                    isOpen={ this.state.isDropdownOpen }
                    toggleDropdown={ this.toggleDropdown }
                >
                    { Object.values(this.props.options).map((option) => (
                        <PlusMinusOption
                            key={ option.id }
                            title={ `${ this.state.options[option.id] } ${ option.title }` }
                            controls={
                                <PlusMinusControls
                                    onIncrease={ this.handleOptionIncrease.bind(this, option.id) }
                                    onDecrease={ this.handleOptionDecrease.bind(this, option.id) }
                                    interval={ this.props.incDecInterval }
                                    isIncreaseBtnDisabled={ this.isIncreaseBtnDisabled(option.id) }
                                    isDecreaseBtnDisabled={ this.isDecreaseBtnDisabled(option.id) }
                                />
                            }
                        />
                    )) }
                </PlusMinusDropdown>
            );
        }
    }

    PlusMinusDropdownController.propTypes = {
        categories:     PropTypes.objectOf(
            PropTypes.shape({
                id:        PropTypes.string.isRequired,
                title:     PropTypes.string.isRequired,
                order:     PropTypes.number.isRequired,
                optionsId: PropTypes.arrayOf(PropTypes.string).isRequired
            }).isRequired
        ).isRequired,
        options:        PropTypes.objectOf(
            PropTypes.shape({
                id:         PropTypes.string.isRequired,
                title:      PropTypes.string.isRequired,
                minNumber:  PropTypes.number.isRequired,
                maxNumber:  PropTypes.number.isRequired,
                categoryId: PropTypes.string.isRequired
            }).isRequired
        ),
        placeholder:    PropTypes.string.isRequired,
        incDecInterval: PropTypes.number.isRequired
    };

    return PlusMinusDropdownController;
}