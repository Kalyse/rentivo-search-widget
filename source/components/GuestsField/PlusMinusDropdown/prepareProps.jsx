import React from "react";
import PropTypes from 'prop-types';

export default (PlusMinusDropdown) => {
    class PlusMinusDropdownWrapper extends React.PureComponent {
        _getNormalizeCategories = () => {
            const categories = {};
            this.props.results.forEach((category, idx) => {
                categories[category.categoryKey] = {
                    id:        category.categoryKey,
                    title:     category.categoryTitle,
                    order:     category.placeholderOrder || idx,
                    optionsId: category.categoryValue.map(option => option.itemValue)
                };
            });

            return categories;
        };

        _getNormalizeOptions = () => {
            const options = {};
            this.props.results.forEach(category => category.categoryValue.forEach(option => {
                options[option.itemValue] = {
                    id:         option.itemValue,
                    categoryId: category.categoryKey,
                    title:      option.itemTitle,
                    minNumber:  option.minNumber,
                    maxNumber:  option.maxNumber
                };
            }));

            return options;
        };

        normalizeData = () => {
            return {
                categories:     this._getNormalizeCategories(),
                options:        this._getNormalizeOptions(),
                placeholder:    this.props.placeholder,
                incDecInterval: this.props.incDecInterval,
            };
        };

        render() {
            return <PlusMinusDropdown { ...this.normalizeData() } />;
        }
    }

    PlusMinusDropdownWrapper.propTypes = {
        results:        PropTypes.arrayOf(
            PropTypes.shape({
                categoryTitle:    PropTypes.string.isRequired,
                categoryKey:      PropTypes.string.isRequired,
                placeholderOrder: PropTypes.number,
                categoryValue:    PropTypes.arrayOf(
                    PropTypes.shape({
                        itemTitle: PropTypes.string.isRequired,
                        itemValue: PropTypes.string.isRequired,
                        minNumber: PropTypes.number.isRequired,
                        maxNumber: PropTypes.number.isRequired,
                    })
                ).isRequired,
            }).isRequired
        ).isRequired,
        placeholder:    PropTypes.string,
        incDecInterval: PropTypes.number,
    };

    return PlusMinusDropdownWrapper;
};