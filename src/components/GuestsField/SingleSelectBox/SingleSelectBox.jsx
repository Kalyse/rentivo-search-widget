import React from 'react';
import PropTypes from 'prop-types';

import SingleSelectBox_Common from '~components/shared/SingleSelectBox_Common/SingleSelectBox_Common';
import withController from './SingleSelectBoxController';
import withPreparedProps from './prepareProps';

const SingleSelectBox = props => <SingleSelectBox_Common className='SingleSelectBox--GuestsField' { ...props }/>;

SingleSelectBox.propTypes = {
    value:    PropTypes.string.isRequired,
    data:     PropTypes.arrayOf(
        PropTypes.shape({
            itemTitle: PropTypes.string,
            itemValue: PropTypes.string
        })
    ).isRequired,
    options:  PropTypes.object,
    onSelect: PropTypes.func.isRequired
};

export default withPreparedProps(withController(React.memo(SingleSelectBox)));
