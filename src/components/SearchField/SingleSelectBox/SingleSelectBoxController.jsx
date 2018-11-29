import React from 'react';
import PropTypes from 'prop-types';

import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        state = {
            value: this.props.initialValue
        };

        generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.data);

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
    };

    return SingleSelectBoxController;
}