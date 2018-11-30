import React from 'react';
import PropTypes from 'prop-types';

import { generateCustomSingleSelectBoxPart, generateSingleSelectBoxPart } from './helpers/urlGenerator';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        state = {
            value: this.props.initialValue
        };

        generateUrlPart       = () => generateSingleSelectBoxPart(this.state.value, this.props.rawData);
        generateCustomUrlPart = () => generateCustomSingleSelectBoxPart(this.state.value, this.props.rawData);

        handleOptionSelect = e => this.setState({ value: e.target.value });

        render() {
            return (
                <SingleSelectBox
                    value={ this.state.value }
                    data={ this.props.data }
                    onSelect={ this.handleOptionSelect }
                    options={ {
                        minimumResultsForSearch: 'Infinity'
                    } }
                />
            );
        }
    }

    SingleSelectBoxController.propTypes = {
        initialValue: PropTypes.string.isRequired,
        data:         PropTypes.array.isRequired,
        rawData:      PropTypes.object
    };

    return SingleSelectBoxController;
}