import React from "react";
import PropTypes from 'prop-types';

export default (MultiSelectBox) => {
    class MultiSelectBoxWrapper extends React.PureComponent {
        _getNormalizedData = () => {
            return this.props.data.map(({ categoryTitle, categoryValue, singleResult }, categoryIdx) => {
                return {
                    text:     categoryTitle,
                    children: categoryValue.map(({ itemTitle: text }, itemIdx) => ({
                        text,
                        id: `${ categoryIdx }/${ itemIdx }`
                    })),
                    "data-single-result": String(singleResult)
                };
            });
        };

        normalizeData = () => {
            return {
                data:        this._getNormalizedData(),
                placeholder: this.props.placeholder
            };
        };

        render() {
            return <MultiSelectBox { ...this.normalizeData() } />;
        }
    }

    MultiSelectBoxWrapper.propTypes = {
        placeholder: PropTypes.string,
        data:        PropTypes.arrayOf(
            PropTypes.shape({
                categoryTitle: PropTypes.string.isRequired,
                singleResult:  PropTypes.bool.isRequired,
                categoryKey:   PropTypes.string.isRequired,
                categoryValue: PropTypes.arrayOf(
                    PropTypes.shape({
                        itemTitle: PropTypes.string.isRequired,
                        itemValue: PropTypes.string.isRequired,
                        WOEID:     PropTypes.string,
                    })
                ).isRequired
            })
        ).isRequired
    };

    MultiSelectBoxWrapper.defaultProps = {
        placeholder: 'Where do you want to go?'
    };

    return MultiSelectBoxWrapper;
};
