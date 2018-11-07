import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import { convertSchemaToSingleSelectBoxData } from '~core/helpers/convertSchema';
import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

import './SingleSelectBox.scss';

export default class SingleSelectBox extends React.PureComponent {
    convertedData = convertSchemaToSingleSelectBoxData(this.props.results);
    searchField   = React.createRef();
    state         = {
        value: this.props.initialValue
    };

    generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.results);

    searchFieldSelect = () => this.setState({ value: this.searchField.current.el.val() });

    render() {
        return (
            <div className="SingleSelectBox">
                <Select2
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

SingleSelectBox.propTypes = {
    initialValue: PropTypes.string,
    placeholder:  PropTypes.string,
    results:      PropTypes.object,
    mode:         PropTypes.string
};