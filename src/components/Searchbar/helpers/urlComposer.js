import { GUESTS_FIELD_MODES, SEARCH_FIELD_MODES, URL_TRANSFORMER_SCHEMES } from '~core/constants';

export default function getRedirectionURL() {
    switch (this.state.urlTransformerScheme) {
        case URL_TRANSFORMER_SCHEMES.ENCODED_GOOGLE_PLACES:
            return _generateEncodedGooglePlaceUrl.call(this);
        case URL_TRANSFORMER_SCHEMES.ALTERNATIVE:
            return _generateAlternativeUrl.call(this);
        case URL_TRANSFORMER_SCHEMES.DEFAULT:
        default:
            return _generateDefaultUrl.call(this);
    }
}


function _generateEncodedGooglePlaceUrl() {
    if (this.state.searchField.mode !== SEARCH_FIELD_MODES.GOOGLE_PLACES) {
        throw new Error(`SearchField mode '${ this.state.searchField.mode }' 
                incompatible with URL transformer scheme '${ this.state.urlTransformerScheme }'`);
    }

    const searchFieldUrlPart = this.SearchFieldRef.current.urlPart;
    const datesFieldsUrlPart = this.DatesFieldsRef.current.urlPart;
    const guestsFieldUrlPart = this.GuestsFieldRef.current.urlPart;

    const urlChunks = [datesFieldsUrlPart, guestsFieldUrlPart, searchFieldUrlPart].filter(chunk => !!chunk);

    return this.state.baseUrl + urlChunks.join('/') + this.state.appendString;
}

function _generateAlternativeUrl() {
    if (this.state.guestsField.mode !== GUESTS_FIELD_MODES.SINGLE_SELECT_BOX) {
        throw new Error(`GuestsField mode '${ this.state.guestsField.mode }' 
                incompatible with URL transformer scheme '${ this.state.urlTransformerScheme }'`);
    }

    const searchFieldUrlPart = this.SearchFieldRef.current.customUrlPart;
    const datesFieldsUrlPart = this.DatesFieldsRef.current.customUrlPart;
    const guestsFieldUrlPart = this.GuestsFieldRef.current.customUrlPart;

    const urlChunks = [searchFieldUrlPart, guestsFieldUrlPart, datesFieldsUrlPart];

    return this.state.baseUrl + urlChunks.join('') + this.state.appendString;
}

function _generateDefaultUrl() {
    const searchFieldUrlPart = this.SearchFieldRef.current.urlPart;
    const datesFieldsUrlPart = this.DatesFieldsRef.current.urlPart;
    const guestsFieldUrlPart = this.GuestsFieldRef.current.urlPart;

    const urlChunks = [searchFieldUrlPart, datesFieldsUrlPart, guestsFieldUrlPart].filter(chunk => !!chunk);

    return this.state.baseUrl + urlChunks.join('/') + this.state.appendString;
}