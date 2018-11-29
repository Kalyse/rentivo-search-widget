import React from "react";
import PropTypes from 'prop-types';

export default (SingleSelectBox) => {
    class SingleSelectBoxWrapper extends React.PureComponent {
        _getNormalizedData = () => {
            return this.props.data.categoryValue.map(({ itemTitle: text, itemValue: id }) => ({ text, id }));
        };

        normalizeData = () => {
            return {
                data:        this._getNormalizedData(),
                placeholder: this.props.placeholder
            };
        };

        render() {
            return <SingleSelectBox { ...this.normalizeData() } />
        }
    }

    SingleSelectBoxWrapper.propTypes = {
        placeholder: PropTypes.string,
        data:        PropTypes.shape({
            categoryTitle: PropTypes.string.isRequired,
            categoryKey:   PropTypes.string.isRequired,
            categoryValue: PropTypes.arrayOf(
                PropTypes.shape({
                    itemTitle: PropTypes.string.isRequired,
                    itemValue: PropTypes.string.isRequired,
                    WOEID:     PropTypes.string
                })
            ).isRequired
        }).isRequired,
    };

    SingleSelectBoxWrapper.defaultProps = {
        placeholder: 'Where do you want to go?'
    };

    return SingleSelectBoxWrapper;
};
