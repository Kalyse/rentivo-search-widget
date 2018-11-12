import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import withController from './MultiSelectBoxController';
import './MultiSelectBox.scss';

const MultiSelectBox = ({
    value,
    data,
    placeholder,
    onSelect
}) => (
    <div className="MultiSelectBox">
        <Select2
            multiple
            value={ value }
            data={ data }
            options={ {
                placeholder: placeholder,
                width:       '100%',
            } }
            onSelect={ onSelect }
        />
    </div>
);

MultiSelectBox.propTypes = {
    value:       PropTypes.array,
    data:        PropTypes.array,
    placeholder: PropTypes.string,
    onSelect:    PropTypes.func
};

export default withController(React.memo(MultiSelectBox));