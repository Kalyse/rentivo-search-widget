import React from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

import { GUESTS_FIELD_MODES, SEARCH_FIELD_MODES, WIDGET_SIZES } from '~core/constants';

import SearchField from '~components/SearchField/SearchFieldRouter';
import GuestsField from '~components/GuestsField/GuestsFieldRouter';
import DatesFields from '~components/DatesFields/DatesFields';
import Button from '~components/shared/Button/Button';

export default (Searchbar) => {
    class SearchbarController extends React.PureComponent {
        SearchbarRef   = React.createRef();
        SearchFieldRef = React.createRef();
        DatesFieldsRef = React.createRef();
        GuestsFieldRef = React.createRef();

        _getWidgetSize = (containerWidth) => {
            switch (true) {
                case containerWidth >= WIDGET_SIZES.EXTRA_LARGE.width:
                    return WIDGET_SIZES.EXTRA_LARGE.id;
                case containerWidth >= WIDGET_SIZES.LARGE.width:
                    return WIDGET_SIZES.LARGE.id;
                case containerWidth >= WIDGET_SIZES.MIDDLE.width:
                    return WIDGET_SIZES.MIDDLE.id;
                case containerWidth >= WIDGET_SIZES.SMALL.width:
                    return WIDGET_SIZES.SMALL.id;
                case containerWidth >= WIDGET_SIZES.EXTRA_SMALL.width:
                    return WIDGET_SIZES.EXTRA_SMALL.id;
                case containerWidth >= WIDGET_SIZES.TINY.width:
                    return WIDGET_SIZES.TINY.id;
                default:
                    return WIDGET_SIZES.DEFAULT.id;
            }
        };

        _getContainerWidth = () => {
            const container      = this.SearchbarRef.current.parentNode;
            const containerWidth = getComputedStyle(container).width;
            return parseInt(containerWidth);
        };

        _manageWidgetSize = () => {
            const containerWidth = this._getContainerWidth();
            const widgetSize     = this._getWidgetSize(containerWidth);
            this.setState({ widgetSize });
        };

        _throttledManageWidgetSize = throttle(this._manageWidgetSize, 500);

        state = {
            searchField: {},
            datesFields: {},
            guestsField: {},
            widgetSize:  WIDGET_SIZES.DEFAULT.id
        };

        handleFormSubmit = () => {
            const redirectionURL = this.props.searchField.mode === SEARCH_FIELD_MODES.NESTED_DROPDOWN
                ? this.generateCustomUrl()
                : this.generateDefaultUrl();
            // alert('Redirection URL: \n' + redirectionURL);
            console.log(redirectionURL);
            // return window.location.href = redirectionURL;
        };

        generateDefaultUrl = () => {
            const searchFieldUrlPart = this.SearchFieldRef.current.urlPart;
            const datesFieldsUrlPart = this.DatesFieldsRef.current.urlPart;
            const guestsFieldUrlPart = this.GuestsFieldRef.current.urlPart;

            let urlChunks = [datesFieldsUrlPart, guestsFieldUrlPart];

            if (this.props.searchField.mode === SEARCH_FIELD_MODES.GOOGLE_PLACES) {
                urlChunks.push(searchFieldUrlPart);
            } else {
                urlChunks.unshift(searchFieldUrlPart);
            }

            urlChunks = urlChunks.filter(chunk => !!chunk);

            return this.props.baseUrl + urlChunks.join('/') + this.props.appendString;
        };

        generateCustomUrl = () => {
            if (this.props.guestsField.mode !== GUESTS_FIELD_MODES.SINGLE_SELECT_BOX) {
                return new Error(`GuestsField mode '${ this.props.guestsField.mode }' 
                incompatible with SearchField mode '${ SEARCH_FIELD_MODES.NESTED_DROPDOWN }'`);
            }

            const searchFieldUrlPart = this.SearchFieldRef.current.customUrlPart;
            const datesFieldsUrlPart = this.DatesFieldsRef.current.customUrlPart;
            const guestsFieldUrlPart = this.GuestsFieldRef.current.customUrlPart;

            const urlChunks = [searchFieldUrlPart, guestsFieldUrlPart, datesFieldsUrlPart];

            return this.props.baseUrl + urlChunks.join('') + this.props.appendString;
        };

        componentDidMount() {
            this._manageWidgetSize();
            window.addEventListener('resize', this._throttledManageWidgetSize)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this._throttledManageWidgetSize)
        }

        render() {
            return (
                <Searchbar
                    searchbarRef={ this.SearchbarRef }
                    sizeClassNames={ WIDGET_SIZES[this.state.widgetSize].classnames }
                    firstCol={
                        <SearchField
                            searchFieldConfig={ this.props.searchField }
                            ref={ this.SearchFieldRef }
                        /> }
                    secondCol={
                        <DatesFields
                            { ...this.props.datesFields }
                            widgetSizeId={ this.state.widgetSize }
                            ref={ this.DatesFieldsRef }
                        /> }
                    thirdCol={
                        <GuestsField
                            guestsFieldConfig={ this.props.guestsField }
                            ref={ this.GuestsFieldRef }
                        /> }
                    fourthCol={
                        <Button styleType="search" onClick={ this.handleFormSubmit }>Search</Button>
                    }
                />
            );
        }
    }

    SearchbarController.propTypes = {
        searchField:  PropTypes.object.isRequired,
        datesFields:  PropTypes.object,
        guestsField:  PropTypes.object.isRequired,
        baseUrl:      PropTypes.string.isRequired,
        appendString: PropTypes.string,
    };

    SearchbarController.defaultProps = {
        baseUrl:      `${ window.location.protocol }//${ window.location.host }/`,
        appendString: '',
    };

    return SearchbarController;
};