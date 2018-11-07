import React from 'react';
import PropTypes from 'prop-types';

import { GUESTS_FIELD_MODES } from '~core/constants';

import PlusMinus from './PlusMinus/PlusMinus'
import SingleSelectBox from './SingleSelectBox/SingleSelectBox'

export default class GuestsField extends React.PureComponent {
    SuitableComponentRef = React.createRef();

    get urlPart() {
        return this.SuitableComponentRef.current.generateUrlPart()
    };

    _getSuitableComponent = () => {
        switch (this.props.guestsFieldConfig.mode) {
            case GUESTS_FIELD_MODES.PLUS_MINUS:
                return PlusMinus;
            case GUESTS_FIELD_MODES.SINGLE_SELECT_BOX:
            default:
                return SingleSelectBox;
        }
    };

    render() {
        const SuitableComponent = this._getSuitableComponent();

        return (
            <div className="GuestsField">
                <SuitableComponent
                    { ...this.props.guestsFieldConfig }
                    ref={ this.SuitableComponentRef }
                />
            </div>
        );
    }
}

GuestsField.propTypes = {
    guestsFieldConfig: PropTypes.oneOfType([
        PropTypes.shape({
            mode: PropTypes.string
        }),
        PropTypes.shape({
            mode:        PropTypes.string,
            placeholder: PropTypes.string,
            results:     PropTypes.arrayOf(
                PropTypes.shape({
                    categoryTitle:    PropTypes.string.isRequired,
                    categoryKey:      PropTypes.string.isRequired,
                    placeholderOrder: PropTypes.number,
                    categoryValue:    PropTypes.arrayOf(
                        PropTypes.shape({
                            itemTitle: PropTypes.string.isRequired,
                            itemValue: PropTypes.string.isRequired,
                            minNumber: PropTypes.number.isRequired,
                            maxNumber: PropTypes.number.isRequired,
                        })
                    ).isRequired,
                }).isRequired
            ).isRequired
        })
    ])
};
