import React from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

import {
    SEARCH_FIELD_MODES,
    WIDGET_SIZES
} from '~core/constants';

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

        submitForm = () => {
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

            const completedUrl = this.props.baseUrl + urlChunks.join('/') + this.props.appendString;

            return window.location.href = completedUrl;
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
                        <Button styleType="search" onClick={ this.submitForm }>Search</Button>
                    }
                />
            );
        }
    }

    SearchbarController.propTypes = {
        searchField:  PropTypes.oneOfType([
            PropTypes.shape({
                initialValue: PropTypes.array,
                placeholder:  PropTypes.string,
                data:         PropTypes.array,
                mode:         PropTypes.string
            }),
            PropTypes.shape({
                initialValue: PropTypes.string,
                placeholder:  PropTypes.string,
                data:         PropTypes.object,
                mode:         PropTypes.string
            }),
            PropTypes.shape({
                API_KEY:               PropTypes.string,
                placeholder:           PropTypes.string,
                mode:                  PropTypes.string,
                componentRestrictions: PropTypes.object
            })
        ]).isRequired,
        datesFields:  PropTypes.shape({
            startDateId:      PropTypes.string,
            endDateId:        PropTypes.string,
            initialStartDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
            initialEndDate:   PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
            dateFormat:       PropTypes.string,
            appendToBody:     PropTypes.bool
        }),
        guestsField:  PropTypes.shape({
            initialValue: PropTypes.string,
            data:         PropTypes.object
        }).isRequired,
        baseUrl:      PropTypes.string.isRequired,
        appendString: PropTypes.string,
    };

    SearchbarController.defaultProps = {
        baseUrl: `${ window.location.protocol }//${ window.location.host }`
    };

    return SearchbarController;
};