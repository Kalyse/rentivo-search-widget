import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import { convertSchemaToSingleSelectBoxData } from '~core/helpers/convertSchema';
import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

import './SingleSelectBox';

export default class SingleSelectBox extends React.PureComponent {
    convertedSearchSchema = convertSchemaToSingleSelectBoxData( this.props.searchSchema );
    searchField = React.createRef();

    state = {
        value: this.props.initialValue
    };

    generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.searchSchema);

    searchFieldSelect = () => this.setState({ value: this.searchField.current.el.val() });

    render() {
        return (
            <div className="SingleSelectBox">
                <Select2
                    value={ this.state.value }
                    data={ this.convertedSearchSchema }
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
    guestsSchema: PropTypes.object,
    mode: PropTypes.string
};
