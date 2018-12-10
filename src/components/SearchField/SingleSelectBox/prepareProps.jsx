import React from "react";
import PropTypes from 'prop-types';
import { WidgetConsumer } from '~components/Searchbar/SearchbarController';
import { searchField } from '~core/defaults';

export default (SingleSelectBox) => {
    class SingleSelectBoxWrapper extends React.PureComponent {
        generateUrlPart       = () => this.props.forwardedRef.current.generateUrlPart();
        generateCustomUrlPart = () => null;

        _getNormalizedData = () => {
            // @formatter:off
            return this.props.data.categoryValue.map(({ itemTitle: text, itemValue: id }) => ({ text, id }));
            // @formatter:on
        };

        normalizeData = () => {
            return {
                data:        this._getNormalizedData(),
                rawData:     this.props.data,
                placeholder: this.props.placeholder,
                dumb:        this.props.dumb
            };
        };

        render() {
            return (
                <WidgetConsumer>
                    { (context) => (
                        <SingleSelectBox
                            context={ context }
                            ref={ this.props.forwardedRef }
                            { ...this.normalizeData() }
                        />
                    ) }
                </WidgetConsumer>
            );
        }
    }

    SingleSelectBoxWrapper.contextType = WidgetConsumer;

    SingleSelectBoxWrapper.propTypes = {
        placeholder: PropTypes.string,
        data:        PropTypes.shape({
            categoryKey:   PropTypes.string.isRequired,
            categoryValue: PropTypes.arrayOf(
                PropTypes.shape({
                    itemTitle: PropTypes.string.isRequired,
                    itemValue: PropTypes.string.isRequired,
                    WOEID:     PropTypes.string
                })
            ).isRequired
        }).isRequired,
        dumb:        PropTypes.bool
    };

    SingleSelectBoxWrapper.defaultProps = {
        ...searchField.singleSelectBox,
        dumb: false
    };

    return React.forwardRef((props, ref) => {
        return <SingleSelectBoxWrapper { ...props } forwardedRef={ ref }/>;
    });
};
