import React from "react";
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

import { generateMultiSelectBoxPart } from './helpers/urlGenerator';

export default (MultiSelectBox) => {
    class MultiSelectBoxController extends React.PureComponent {
        // it fixes issue with non-recalculating of input's width during resizing window
        select2Reinit           = () => this.forceUpdate();
        _throttledSelect2Reinit = throttle(this.select2Reinit, 500);

        state = {
            value: []
        };

        generateUrlPart   = () => generateMultiSelectBoxPart(this.state.value, this.props.rawData);
        searchFieldSelect = (e) => {
            let selectedValues     = [...e.target.options].filter(option => option.selected).map(option => option.value);
            const selectedOption   = e.params.data.element;
            const selectedOptGroup = selectedOption.parentElement;

            // if specified 'singleResult' for current optGroup - replace old option by new
            if (JSON.parse(selectedOptGroup.dataset.singleResult)) {
                const optGroupValues = [...selectedOptGroup.children].map((option) => option.value);
                selectedValues       = selectedValues.filter(val => !optGroupValues.includes(val));
                selectedValues.push(selectedOption.value);
            }

            this.setState({ value: selectedValues });
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
                    onSelect={ this.searchFieldSelect }
                    key={ Math.random() }
                />
            );
        }

    }

    MultiSelectBoxController.propTypes = {
        placeholder: PropTypes.string.isRequired,
        data:        PropTypes.array.isRequired,
        rawData:     PropTypes.array.isRequired,
    };

    return MultiSelectBoxController;
}