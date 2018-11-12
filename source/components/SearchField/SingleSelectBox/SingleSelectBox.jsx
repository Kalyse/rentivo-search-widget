import React from 'react';
import PropTypes from 'prop-types';

import SingleSelectBox_Common from '~components/shared/SingleSelectBox_Common/SingleSelectBox_Common';
import withController from './SingleSelectBoxController';

const SingleSelectBox = props => <SingleSelectBox_Common className='SingleSelectBox--SearchField' { ...props }/>;

SingleSelectBox.propTypes = {
    value:    PropTypes.string,
    data:     PropTypes.arrayOf(
        PropTypes.shape({
            itemTitle: PropTypes.string,
            itemValue: PropTypes.string
        })
    ).isRequired,
    options:  PropTypes.shape({
        placeholder: PropTypes.string.isRequired
    }).isRequired,
    onSelect: PropTypes.func.isRequired
};

export default withController(React.memo(SingleSelectBox));
