import React from "react";
import PropTypes from 'prop-types';
import { guestsField } from '~core/defaults';

export default (PlusMinusDropdown) => {
    class PlusMinusDropdownWrapper extends React.PureComponent {
        generateUrlPart       = () => this.props.forwardedRef.current.generateUrlPart();
        generateCustomUrlPart = () => null;

        _getNormalizedCategories = () => {
            const categories = {};
            this.props.data.forEach((category, idx) => {
                categories[category.categoryKey] = {
                    id:        category.categoryKey,
                    title:     category.categoryTitle,
                    order:     category.placeholderOrder || 1,
                    optionsId: category.categoryValue.map(option => option.itemKey)
                };
            });

            return categories;
        };

        _getNormalizedOptions = () => {
            const options = {};
            this.props.data.forEach(category => category.categoryValue.forEach(option => {
                options[option.itemKey] = {
                    id:         option.itemKey,
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
                categories:     this._getNormalizedCategories(),
                options:        this._getNormalizedOptions(),
                placeholder:    this.props.placeholder,
                incDecInterval: this.props.incDecInterval,
            };
        };

        render() {
            return <PlusMinusDropdown ref={ this.props.forwardedRef } { ...this.normalizeData() } />;
        }
    }

    PlusMinusDropdownWrapper.propTypes = {
        placeholder:    PropTypes.string,
        incDecInterval: PropTypes.number,
        data:           PropTypes.arrayOf(
            PropTypes.shape({
                categoryTitle:    PropTypes.string.isRequired,
                categoryKey:      PropTypes.string.isRequired,
                placeholderOrder: PropTypes.number,
                categoryValue:    PropTypes.arrayOf(
                    PropTypes.shape({
                        itemTitle: PropTypes.string.isRequired,
                        itemKey:   PropTypes.string.isRequired,
                        minNumber: PropTypes.number.isRequired,
                        maxNumber: PropTypes.number.isRequired,
                    })
                ).isRequired,
            }).isRequired
        ).isRequired,
    };

    PlusMinusDropdownWrapper.defaultProps = {
        ...guestsField.plusMinus
    };

    return React.forwardRef((props, ref) => {
        return <PlusMinusDropdownWrapper { ...props } forwardedRef={ ref }/>;
    });
};
