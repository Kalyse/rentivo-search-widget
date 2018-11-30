import React from "react";
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';
import { resetCustomWidgetConfig, setCustomWidgetConfig } from '~core/helpers/customWidgetConfig';

import { generateMultiSelectBoxPart } from './helpers/urlGenerator';

export default (MultiSelectBox) => {
    class MultiSelectBoxController extends React.PureComponent {
        // it fixes issue with non-recalculating of input's width during resizing window
        select2Reinit           = () => this.forceUpdate();
        _throttledSelect2Reinit = throttle(this.select2Reinit, 500);

        state = {
            value: []
        };

        setCustomWidgetConfig   = setCustomWidgetConfig.bind(this);
        resetCustomWidgetConfig = resetCustomWidgetConfig.bind(this);

        generateUrlPart    = () => generateMultiSelectBoxPart(this.state.value, this.props.rawData);

        updateGlobalWidgetConfig = (selectedOption) => {
            // if has a custom widget config - change state of Searchbar
            const [categoryIdx, itemIdx] = selectedOption.value.split('/');
            const { singleResult }       = this.props.rawData[categoryIdx];
            const { customWidgetConfig } = this.props.rawData[categoryIdx].categoryValue[itemIdx];

            if (!singleResult) {
                return;
            }

            if (customWidgetConfig) {
                this.setCustomWidgetConfig(customWidgetConfig);
            } else {
                this.resetCustomWidgetConfig();
            }
        };

        handleOptionSelect = (e) => {
            let selectedValues     = [...e.target.options].filter(option => option.selected).map(option => option.value);
            const selectedOption   = e.params.data.element;
            const selectedOptGroup = selectedOption.parentElement;

            // if specified 'singleResult' for current optGroup - replace old option by new
            if (JSON.parse(selectedOptGroup.dataset.singleResult)) {
                const optGroupValues = [...selectedOptGroup.children].map((option) => option.value);
                selectedValues       = selectedValues.filter(val => !optGroupValues.includes(val));
                selectedValues.push(selectedOption.value);
            }

            this.setState({ value: selectedValues }, () => {
                this.updateGlobalWidgetConfig(selectedOption);
            });
        };

        componentDidMount() {
            window.addEventListener('resize', this._throttledSelect2Reinit)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this._throttledSelect2Reinit)
        }

        render() {
            return (
                <MultiSelectBox
                    value={ this.state.value }
                    data={ this.props.data }
                    placeholder={ this.props.placeholder }
                    onSelect={ this.handleOptionSelect }
                    key={ Math.random() }
                />
            );
        }

    }

    MultiSelectBoxController.propTypes = {
        placeholder: PropTypes.string.isRequired,
        data:        PropTypes.array.isRequired,
        rawData:     PropTypes.array.isRequired,
        context:     PropTypes.object.isRequired
    };

    return MultiSelectBoxController;
}