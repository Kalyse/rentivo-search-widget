import React from 'react';

import { GUESTS_FIELD_MODES } from '~core/constants';

import PlusMinusDropdown from './PlusMinusDropdown/PlusMinusDropdown'
import SingleSelectBox from './SingleSelectBox/SingleSelectBox'

export default class GuestsField extends React.PureComponent {
    SuitableComponentRef = React.createRef();

    get urlPart() {
        return this.SuitableComponentRef.current.generateUrlPart()
    };

    get customUrlPart() {
        return this.SuitableComponentRef.current.generateCustomUrlPart()
    };

    _getSuitableComponent = () => {
        switch (this.props.guestsFieldConfig.mode) {
            case GUESTS_FIELD_MODES.PLUS_MINUS:
                return PlusMinusDropdown;
            case GUESTS_FIELD_MODES.SINGLE_SELECT_BOX:
            default:
                return SingleSelectBox;
        }
    };

    render() {
        const SuitableComponent = this._getSuitableComponent();

        return (
            <SuitableComponent
                { ...this.props.guestsFieldConfig }
                ref={ this.SuitableComponentRef }
            />
        );
    }
}
