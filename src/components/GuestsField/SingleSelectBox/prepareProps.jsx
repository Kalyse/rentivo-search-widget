import React from "react";
import PropTypes from 'prop-types';

export default (SingleSelectBox) => {
    class SingleSelectBoxWrapper extends React.PureComponent {
        generateUrlPart       = () => this.props.forwardedRef.current.generateUrlPart();
        generateCustomUrlPart = () => this.props.forwardedRef.current.generateCustomUrlPart();

        _getNormalizedData = () => {
            // @formatter:off
            return this.props.data.categoryValue.map(({ itemTitle: text, itemValue: id }) => ({ text, id }));
            // @formatter:on
        };

        normalizeData = () => {
            return {
                data:         this._getNormalizedData(),
                rawData:      this.props.data,
                initialValue: this.props.initialValue || this._getNormalizedData()[0].id,
            };
        };

        render() {
            return <SingleSelectBox ref={ this.props.forwardedRef } { ...this.normalizeData() } />
        }
    }

    SingleSelectBoxWrapper.propTypes = {
        initialValue: PropTypes.string,
        data:         PropTypes.shape({
            categoryTitle: PropTypes.string.isRequired,
            categoryKey:   PropTypes.string.isRequired,
            categoryValue: PropTypes.arrayOf(
                PropTypes.shape({
                    itemTitle: PropTypes.string.isRequired,
                    itemValue: PropTypes.string.isRequired,
                })
            ).isRequired
        }).isRequired,
    };

    SingleSelectBoxWrapper.defaultProps = {
        placeholder: 'Where do you want to go?'
    };

    return React.forwardRef((props, ref) => {
        return <SingleSelectBoxWrapper { ...props } forwardedRef={ ref }/>;
    });
};
