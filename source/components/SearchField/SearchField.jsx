import React from 'react';

import MultiSelectBox from './MultiSelectBox/MultiSelectBox';
import SingleSelectBox from './SingleSelectBox/SingleSelectBox';
import GooglePlaces from './GooglePlaces/GooglePlaces';
import PropTypes from "prop-types";

export default class SearchField extends React.PureComponent {
    SuitableComponentRef = React.createRef();

    get urlPart() {
        return this.SuitableComponentRef.current.generateUrlPart()
    };

    _getSuitableComponent = () => {
        switch ( this.props.searchFieldData.mode ) {
            case 'GooglePlaces':
                return GooglePlaces;
            case 'SingleSelectBox':
                return SingleSelectBox;
            case 'MultiSelectBox':
            default:
                return MultiSelectBox;
        }
    };

    render() {
        const SuitableComponent = this._getSuitableComponent();

        return (
            <div className="SearchField">
                <SuitableComponent
                    { ...this.props.searchFieldData }
                    ref={ this.SuitableComponentRef }
                />
            </div>
        );
    }
}

SearchField.propTypes = {
    searchFieldData: PropTypes.oneOfType( [
        PropTypes.shape( {
            initialValue: PropTypes.array,
            placeholder:  PropTypes.string,
            searchSchema: PropTypes.array,
            mode: PropTypes.string
        } ),
        PropTypes.shape( {
            initialValue: PropTypes.string,
            placeholder:  PropTypes.string,
            guestsSchema: PropTypes.object,
            mode: PropTypes.string
        } ),
        PropTypes.shape( {
            API_KEY:     PropTypes.string,
            placeholder: PropTypes.string,
            mode: PropTypes.string
        } )
    ] )
};
