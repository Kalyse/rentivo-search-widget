import React from "react";
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

import { convertSchemaToMultiSelectBoxData } from '~core/helpers/convertSchema';
import { generateMultiSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

export default (MultiSelectBox) => {
    class MultiSelectBoxController extends React.PureComponent {
        convertedData = convertSchemaToMultiSelectBoxData(this.props.results);

        // it fixes issue with non-recalculating of input's width when resizing window
        select2Reinit           = () => this.forceUpdate();
        _throttledSelect2Reinit = throttle(this.select2Reinit, 500);

        state = {
            value: this.props.initialValue
        };

        generateUrlPart = () => generateMultiSelectBoxPart(this.state.value, this.props.results);

        searchFieldSelect = (e) => {
            let selectedValues     = [...e.target.options].filter(option => option.selected).map(option => option.value);
            const selectedOption   = e.params.data.element;
            const selectedOptGroup = selectedOption.parentElement;

            // if specified 'singleResult' for current optGroup - replace old option by new
            if (JSON.parse(selectedOptGroup.dataset.singleResult)) {
                const optGroupValues = [...selectedOptGroup.children].map((option) => option.value);
                selectedValues       = selectedValues.filter(val => !optGroupValues.some(optGroupVal => val === optGroupVal));
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
                    data={ this.convertedData }
                    placeholder={ this.props.placeholder }
                    onSelect={ this.searchFieldSelect }
                    key={ Math.random() }
                />
            );
        }

    }

    MultiSelectBoxController.propTypes = {
        initialValue: PropTypes.array,
        placeholder:  PropTypes.string,
        results:      PropTypes.array,
    };

    return MultiSelectBoxController;
}