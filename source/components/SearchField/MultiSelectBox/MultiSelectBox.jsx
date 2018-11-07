import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import { convertSchemaToMultiSelectBoxData } from '~core/helpers/convertSchema';
import { generateMultiSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

import './MultiSelectBox.scss';

export default class MultiSelectBox extends React.PureComponent {
    convertedData = convertSchemaToMultiSelectBoxData(this.props.results);
    searchField   = React.createRef();

    state = {
        value: this.props.initialValue
    };

    generateUrlPart = () => generateMultiSelectBoxPart(this.state.value, this.props.results);

    searchFieldSelect = (e) => {
        const $searchField    = this.searchField.current.el;
        let searchFieldValues = $searchField.val();
        const $option         = $(e.params.data.element);
        const $optGroup       = $option.parent();

        if ($optGroup.data('singleResult')) {
            const optGroupValues = $optGroup.children().map((idx, element) => $(element).val()).get();
            searchFieldValues    = searchFieldValues.filter(val => !optGroupValues.some(optGroupVal => val === optGroupVal));
            searchFieldValues.push($option.val());
        }

        this.setState({ value: searchFieldValues });
    };

    render() {
        return (
            <div className="MultiSelectBox">
                <Select2
                    multiple
                    value={ this.state.value }
                    data={ this.convertedData }
                    options={ {
                        placeholder: this.props.placeholder,
                        width:       '100%',
                    } }
                    onSelect={ this.searchFieldSelect }
                    ref={ this.searchField }
                />
            </div>

        );
    }
}

MultiSelectBox.propTypes = {
    initialValue: PropTypes.array,
    placeholder:  PropTypes.string,
    results:      PropTypes.array,
    mode:         PropTypes.string
};