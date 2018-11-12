import React from 'react';

import { SEARCH_FIELD_MODES } from '~core/constants';

import MultiSelectBox from './MultiSelectBox/MultiSelectBox';
import SingleSelectBox from './SingleSelectBox/SingleSelectBox';
import GooglePlaces from './GooglePlaces/GooglePlaces';

export default class SearchField extends React.PureComponent {
    SuitableComponentRef = React.createRef();

    get urlPart() {
        return this.SuitableComponentRef.current.generateUrlPart()
    };

    _getSuitableComponent = () => {
        switch (this.props.searchFieldConfig.mode) {
            case SEARCH_FIELD_MODES.GOOGLE_PLACES:
                return GooglePlaces;
            case SEARCH_FIELD_MODES.SINGLE_SELECT_BOX:
                return SingleSelectBox;
            case SEARCH_FIELD_MODES.MULTI_SELECT_BOX:
            default:
                return MultiSelectBox;
        }
    };

    render() {
        const SuitableComponent = this._getSuitableComponent();

        return (
            <SuitableComponent
                { ...this.props.searchFieldConfig }
                ref={ this.SuitableComponentRef }
            />
        );
    }
}