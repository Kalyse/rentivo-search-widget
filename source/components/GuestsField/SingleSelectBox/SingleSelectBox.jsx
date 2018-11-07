import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import { convertSchemaToSingleSelectBoxData } from '~core/helpers/convertSchema';
import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

import './SingleSelectBox.scss';

export default class SingleSelectBox extends React.PureComponent {
    convertedData = convertSchemaToSingleSelectBoxData(this.props.results);
    guestsField   = React.createRef();
    state         = {
        value: this.props.initialValue
    };

    generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.results);

    guestsFieldSelect = () => this.setState({ value: this.guestsField.current.el.val() });

    render() {
        return (
            <div className="SingleSelectBox">
                <Select2
                    value={ this.state.value }
                    data={ this.convertedData }
                    options={ {
                        width:                   '100%',
                        minimumResultsForSearch: 'Infinity'
                    } }
                    onSelect={ this.guestsFieldSelect }
                    ref={ this.guestsField }
                />
            </div>
        );
    }
}