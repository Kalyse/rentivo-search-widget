import 'custom-event-polyfill';
import React, { createContext } from 'react';
import Cookie from '~core/Services/Cookie';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';
import omit from 'lodash/omit';

import { GUESTS_FIELD_MODES, SEARCH_FIELD_MODES, URL_TRANSFORMER_SCHEMES, WIDGET_SIZES } from '~core/constants';
import { cookieConfig, widgetConfig } from '~core/defaults';
import getWidgetSize from '~core/helpers/getWidgetSize';

import SearchField from '~components/SearchField/SearchFieldRouter';
import GuestsField from '~components/GuestsField/GuestsFieldRouter';
import DatesFields from '~components/DatesFields/DatesFields';
import Button from '~components/shared/Button/Button';

import getRedirectionURL from './helpers/urlComposer';

const WidgetContext         = createContext({});
export const WidgetProvider = WidgetContext.Provider;
export const WidgetConsumer = WidgetContext.Consumer;

export default (Searchbar) => {
    class SearchbarController extends React.Component {
        SearchbarRef   = React.createRef();
        SearchFieldRef = React.createRef();
        DatesFieldsRef = React.createRef();
        GuestsFieldRef = React.createRef();

        cookie = new Cookie({ ...this.props.cookieConfig });

        _getContainerWidth = () => {
            const container      = this.SearchbarRef.current.parentNode;
            const containerWidth = getComputedStyle(container).width;
            return parseInt(containerWidth);
        };

        _manageWidgetSize = () => {
            const containerWidth = this._getContainerWidth();
            const widgetSize     = getWidgetSize(containerWidth, WIDGET_SIZES);
            this.setState({ widgetSize });
        };

        _throttledManageWidgetSize = throttle(this._manageWidgetSize, 150);

        state = {
            searchField:          this.props.searchField,
            datesFields:          this.cookie.get('datesFields') || this.props.datesFields,
            guestsField:          this.cookie.get('guestsField') || this.props.guestsField,
            baseUrl:              this.cookie.get('baseUrl') || this.props.baseUrl,
            appendString:         this.cookie.get('appendString') || this.props.appendString,
            searchBtnText:        this.cookie.get('searchBtnText') || this.props.searchBtnText,
            urlTransformerScheme: this.cookie.get('urlTransformerScheme') || this.props.urlTransformerScheme,
            widgetSize:           WIDGET_SIZES.DEFAULT.id
        };

        getRedirectionURL = getRedirectionURL.bind(this);

        handleFormSubmit = () => {
            const redirectionURL = this.getRedirectionURL();
            const event          = new CustomEvent('redirect', { 'detail': redirectionURL });
            window.dispatchEvent(event);
        };

        redirectPage = (e) => {
            if (process.env.STORYBOOK_ENV) {
                return;
            }

            const isInIFrame = (
                window.location !== window.parent.location
            );
            if (isInIFrame === true) {
                // iframe
                window.top.location.href = e.detail;
            } else {
                // no iframe
                window.location.href = e.detail;
            }
        };

        componentDidMount() {
            this._manageWidgetSize();
            window.addEventListener('resize', this._throttledManageWidgetSize);
            window.addEventListener('redirect', this.redirectPage);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this._throttledManageWidgetSize);
            window.removeEventListener('redirect', this.redirectPage);
        }

        // when storybook's state is changing
        componentWillReceiveProps(nextProps) {
            if (!process.env.STORYBOOK_ENV) {
                return;
            }
            if (this.props === nextProps) {
                return;
            }

            this.setState({ ...nextProps });
        }

        render() {
            return (
                <WidgetProvider
                    value={ {
                        initState: omit(this.props, ['searchField']),
                        state:     omit(this.state, ['searchField', 'widgetSize']),
                        actions:   {
                            setCustomDatesFields:          (datesFields) => {
                                this.setState({ datesFields });
                                this.cookie.set('datesFields', datesFields);
                            },
                            setCustomGuestsField:          (guestsField) => {
                                this.setState({ guestsField });
                                this.cookie.set('guestsField', guestsField);
                            },
                            setCustomBaseUrl:              (baseUrl) => {
                                this.setState({ baseUrl });
                                this.cookie.set('baseUrl', baseUrl);
                            },
                            setCustomAppendString:         (appendString) => {
                                this.setState({ appendString });
                                this.cookie.set('appendString', appendString);
                            },
                            setCustomSearchBtnText:        (searchBtnText) => {
                                this.setState({ searchBtnText });
                                this.cookie.set('searchBtnText', searchBtnText);
                            },
                            setCustomUrlTransformerScheme: (urlTransformerScheme) => {
                                this.setState({ urlTransformerScheme });
                                this.cookie.set('urlTransformerScheme', urlTransformerScheme);
                            }
                        },
                    } }
                >
                    <Searchbar
                        searchbarRef={ this.SearchbarRef }
                        sizeClassNames={ WIDGET_SIZES[this.state.widgetSize].classnames }
                        firstCol={
                            <SearchField
                                searchFieldConfig={ this.state.searchField }
                                ref={ this.SearchFieldRef }
                            /> }
                        secondCol={
                            <DatesFields
                                { ...this.state.datesFields }
                                widgetSizeId={ this.state.widgetSize }
                                ref={ this.DatesFieldsRef }
                            /> }
                        thirdCol={
                            <GuestsField
                                guestsFieldConfig={ this.state.guestsField }
                                ref={ this.GuestsFieldRef }
                            /> }
                        fourthCol={
                            <Button styleType="search"
                                    onClick={ this.handleFormSubmit }>{ this.state.searchBtnText }</Button>
                        }
                    />
                </WidgetProvider>
            );
        }
    }

    SearchbarController.propTypes = {
        searchField:          PropTypes.object.isRequired,
        datesFields:          PropTypes.object,
        guestsField:          PropTypes.object.isRequired,
        baseUrl:              PropTypes.string,
        appendString:         PropTypes.string,
        searchBtnText:        PropTypes.string,
        urlTransformerScheme: PropTypes.oneOf(Object.values(URL_TRANSFORMER_SCHEMES)),
        cookieConfig:         PropTypes.shape({
            isAllowed: PropTypes.bool,
            maxAge:    PropTypes.number,
            nameSpace: PropTypes.string
        })
    };

    SearchbarController.defaultProps = {
        ...widgetConfig,
        cookieConfig
    };


    return SearchbarController;
};
