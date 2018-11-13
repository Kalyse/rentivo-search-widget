import React from 'react';
import PropTypes from 'prop-types';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

import './SingleSelectBox_Common.scss';

const SingleSelectBox_Common = ({
    className = '',
    value = null,
    data,
    options = {},
    onSelect
}) => (
    <div className={ `SingleSelectBox ${className}` }>
        <Select2
            value={ value }
            data={ data }
            options={ {
                ...options,
                width: '100%',
            } }
            onSelect={ onSelect }
        />
    </div>
);

SingleSelectBox_Common.propTypes = {
    className: PropTypes.string,
    value:     PropTypes.string,
    data:      PropTypes.arrayOf(
        PropTypes.shape({
            itemTitle: PropTypes.string,
            itemValue: PropTypes.string
        })
    ).isRequired,
    options:   PropTypes.object,
    onSelect:  PropTypes.func.isRequired,
};

export default React.memo(SingleSelectBox_Common);
