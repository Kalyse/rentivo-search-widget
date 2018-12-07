import React from 'react';
import PropTypes from 'prop-types';
import { resetCustomWidgetConfig, setCustomWidgetConfig } from '~core/helpers/customWidgetConfig';

import { generateSingleSelectBoxPart } from './helpers/urlGenerator';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        state = {
            value: null
        };

        setCustomWidgetConfig   = setCustomWidgetConfig.bind(this);
        resetCustomWidgetConfig = resetCustomWidgetConfig.bind(this);

        generateUrlPart = () => this.state.value && generateSingleSelectBoxPart(this.state.value, this.props.rawData);

        updateGlobalWidgetConfig = (newValue) => {
            // if has a custom widget config - change state of Searchbar
            const { customWidgetConfig } = this.props.rawData.categoryValue.find(({ itemValue }) => itemValue === newValue);

            if (customWidgetConfig) {
                this.setCustomWidgetConfig(customWidgetConfig);
            } else {
                this.resetCustomWidgetConfig();
            }
        };

        handleOptionSelect = e => {
            const newValue = e.target.value;
            this.setState({ value: newValue }, () => {
                if (!this.props.dumb) {
                    this.updateGlobalWidgetConfig(newValue);
                }
            });
        };

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
        rawData:     PropTypes.object.isRequired,
        context:     PropTypes.object.isRequired,
        dumb:        PropTypes.bool.isRequired
    };

    return SingleSelectBoxController;
}