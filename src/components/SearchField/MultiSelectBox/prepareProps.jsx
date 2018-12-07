import React from "react";
import PropTypes from 'prop-types';
import { WidgetConsumer } from '~components/Searchbar/SearchbarController';

export default (MultiSelectBox) => {
    class MultiSelectBoxWrapper extends React.PureComponent {
        generateUrlPart       = () => this.props.forwardedRef.current.generateUrlPart();
        generateCustomUrlPart = () => null;

        _getNormalizedData = () => {
            return this.props.data.map(({ categoryTitle, categoryValue, singleResult }, categoryIdx) => {
                // @formatter:off
                return {
                    text:     categoryTitle,
                    children: categoryValue.map(({ itemTitle: text }, itemIdx) => ({
                        text,
                        id: `${ categoryIdx }/${ itemIdx }`
                    })),
                    "data-single-result": String(singleResult)
                };
                // @formatter:on
            });
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
                        <MultiSelectBox
                            context={ context }
                            ref={ this.props.forwardedRef }
                            { ...this.normalizeData() }
                        />
                    ) }
                </WidgetConsumer>
            );
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
        ).isRequired,
        dumb:        PropTypes.bool
    };

    MultiSelectBoxWrapper.defaultProps = {
        placeholder: 'Where do you want to go?',
        dumb:        false
    };

    return React.forwardRef((props, ref) => {
        return <MultiSelectBoxWrapper { ...props } forwardedRef={ ref }/>;
    });
};
