import React from 'react';
import PropTypes from 'prop-types';

import Cookie from '~core/Services/Cookie';

import { generateCustomSingleSelectBoxPart, generateSingleSelectBoxPart } from './helpers/urlGenerator';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        cookie = new Cookie();

        state = {
            value: !this.props.dumb && this.cookie.get('GuestsField.SingleSelectBox.value') || this.props.initialValue
        };

        generateUrlPart       = () => generateSingleSelectBoxPart(this.state.value, this.props.rawData);
        generateCustomUrlPart = () => generateCustomSingleSelectBoxPart(this.state.value, this.props.rawData);

        handleOptionSelect = e => this.setState({ value: e.target.value }, () => {
            if (!this.props.dumb) {
                this.cookie.set('GuestsField.SingleSelectBox.value', e.target.value);
            }
        });

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

        componentWillUpdate(nextProps) {
            if (nextProps.initialValue !== this.props.initialValue) {
                this.setState({
                    value: nextProps.initialValue
                });
            }
        }
    }

    SingleSelectBoxController.propTypes = {
        initialValue: PropTypes.string.isRequired,
        data:         PropTypes.array.isRequired,
        rawData:      PropTypes.object.isRequired,
        dumb:         PropTypes.bool.isRequired,

    };

    return SingleSelectBoxController;
}
