import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';

import { GUESTS_FIELD_MODES, SEARCH_FIELD_MODES, URL_TRANSFORMER_SCHEMES, WIDGET_SIZES } from '~core/constants';
import { widgetConfig } from '~core/defaults';
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
    class SearchbarController extends React.PureComponent {
        SearchbarRef   = React.createRef();
        SearchFieldRef = React.createRef();
        DatesFieldsRef = React.createRef();
        GuestsFieldRef = React.createRef();

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

        _throttledManageWidgetSize = throttle(this._manageWidgetSize, 500);

        initState = {
            searchField:          this.props.searchField,
            datesFields:          this.props.datesFields,
            guestsField:          this.props.guestsField,
            baseUrl:              this.props.baseUrl,
            appendString:         this.props.appendString,
            searchBtnText:        this.props.searchBtnText,
            urlTransformerScheme: this.props.urlTransformerScheme,
            widgetSize:           WIDGET_SIZES.DEFAULT.id
        };

        state = { ...this.initState };

        getRedirectionURL = getRedirectionURL.bind(this);

        handleFormSubmit = () => {
            const redirectionURL = this.getRedirectionURL();
            const event          = new CustomEvent('redirect', { 'detail': redirectionURL });
            window.dispatchEvent(event);
        };

        redirectPage = (e) => {
            if (process.env.NODE_ENV === 'storybook') {
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

        componentWillUpdate(nextProps, nextState) {
            if (this.props !== nextProps) {
                this.initState = { ...nextProps };
                this.setState({
                    ...nextProps
                });
            }
        }

        render() {
            return (
                <WidgetProvider
                    value={ {
                        initState: {
                            datesFields:          this.initState.datesFields,
                            guestsField:          this.initState.guestsField,
                            baseUrl:              this.initState.baseUrl,
                            appendString:         this.initState.appendString,
                            searchBtnText:        this.initState.searchBtnText,
                            urlTransformerScheme: this.initState.urlTransformerScheme,
                        },
                        state:     {
                            datesFields:          this.state.datesFields,
                            guestsField:          this.state.guestsField,
                            baseUrl:              this.state.baseUrl,
                            appendString:         this.state.appendString,
                            searchBtnText:        this.state.searchBtnText,
                            urlTransformerScheme: this.state.urlTransformerScheme,
                        },
                        actions:   {
                            setCustomDatesFields:    (datesFields) => this.setState({ datesFields }),
                            setCustomGuestsField:    (guestsField) => this.setState({ guestsField }),
                            setCustomBaseUrl:        (baseUrl) => this.setState({ baseUrl }),
                            setCustomAppendString:   (appendString) => this.setState({ appendString }),
                            setSearchBtnText:        (searchBtnText) => this.setState({ searchBtnText }),
                            setUrlTransformerScheme: (urlTransformerScheme) => this.setState({ urlTransformerScheme })
                        }
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
        urlTransformerScheme: PropTypes.oneOf(Object.values(URL_TRANSFORMER_SCHEMES))
    };

    SearchbarController.defaultProps = {
        ...widgetConfig
    };

    return SearchbarController;
};