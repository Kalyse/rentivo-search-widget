import React from 'react';
import PropTypes from 'prop-types';

import { convertSchemaToSingleSelectBoxData } from '~core/helpers/convertSchema';
import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        convertedData = convertSchemaToSingleSelectBoxData(this.props.data);
        state         = {
            value: this.props.initialValue
        };

        generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.data);

        handleOptionSelect = e => this.setState({ value: e.target.value });

        render() {
            return (
                <SingleSelectBox
                    value={ this.state.value }
                    data={ this.convertedData }
                    onSelect={ this.handleOptionSelect }
                    options={ {
                        placeholder: this.props.placeholder,
                    } }
                />
            )
        }
    }

    SingleSelectBoxController.propTypes = {
        placeholder: PropTypes.string.isRequired,
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

    return SingleSelectBoxController;
}