import React from 'react';
import PropTypes from 'prop-types';

import { generateSingleSelectBoxPart } from './helpers/urlGenerator';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        state = {
            value: null
        };

        generateUrlPart = () => this.state.value && generateSingleSelectBoxPart(this.state.value, this.props.rawData);

        handleOptionSelect = e => this.setState({ value: e.target.value });

        render() {
            return (
                <SingleSelectBox
                    value={ this.state.value }
                    data={ this.props.data }
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
        data:        PropTypes.array.isRequired,
        rawData:     PropTypes.object.isRequired
    };

    return SingleSelectBoxController;
}