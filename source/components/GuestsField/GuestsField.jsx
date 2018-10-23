import React from 'react';
import PropTypes from 'prop-types';
import Select2 from 'react-select2-wrapper';

import { convertSchemaToSingleSelectBoxData }  from '~core/helpers/convertSchema';

import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl'

import './GuestsField.scss';

export default class GuestsField extends React.PureComponent {


    convertedGuestsSchema = convertSchemaToSingleSelectBoxData( this.props.guestsSchema );

    state = {
        value: this.props.initialValue
    };

    guestsField = React.createRef();

    get urlPart() {
        return generateSingleSelectBoxPart(this.state.value, this.props.guestsSchema)
    };

    guestsFieldChange = () => this.setState( {
        value: this.guestsField.current.el.val()
    } );

    render() {
        return (
            <div className="GuestsField">
                <Select2
                    value={ this.state.value }
                    data={ this.convertedGuestsSchema }
                    options={ {
                        width:                   '100%',
                        minimumResultsForSearch: 'Infinity'
                    } }
                    onChange={ this.guestsFieldChange }
                    ref={ this.guestsField }
                />
            </div>
        );
    }
}

GuestsField.propTypes = {
    initialValue: PropTypes.string,
    guestsSchema: PropTypes.object
};
