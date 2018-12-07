import React from 'react';

import { storiesOf } from '@storybook/react';
import { datesFields, widgetConfig } from '~core/defaults';
import Marked from 'storybook-readme/components/Marked';
import { number, object, select, withKnobs } from '@storybook/addon-knobs';
import Searchbar from "~components/Searchbar/Searchbar";
import searchFieldConfig_singleSelectBox from "../jsonExamples/searchField--singleSelectBox";
import searchFieldConfig_multiSelectBox from "../jsonExamples/searchField--multiSelectBox";
import searchFieldConfig_googlePlaces from "../jsonExamples/searchField--googlePlaces";
import searchFieldConfig_nestedDropdown from "../jsonExamples/searchField--nestedDropdown";

import guestsFieldConfig_singleSelectBox from "../jsonExamples/guestsField--singleSelectBox";
import guestsFieldConfig_plusMinus from "../jsonExamples/guestsField--plusMinus";

import WidgetWrapper from './HelperComponents/WidgetWrapper';
import PreviewComponent from './HelperComponents/PreviewComponent';
import URLToRedirect from './HelperComponents/URLToRedirect';

function getSearchFieldConfig(searchFieldMode) {
    switch (searchFieldMode) {
        case 'single':
            return searchFieldConfig_singleSelectBox;
        case 'multi':
            return searchFieldConfig_multiSelectBox;
        case 'google':
            return searchFieldConfig_googlePlaces;
        case 'nested':
            return searchFieldConfig_nestedDropdown;
        default:
            return searchFieldConfig_singleSelectBox;
    }
}

function getGuestsFieldConfig(guestsFieldMode) {
    switch (guestsFieldMode) {
        case 'single':
            return guestsFieldConfig_singleSelectBox;
        case 'plus_minus':
            return guestsFieldConfig_plusMinus;
        default:
            return guestsFieldConfig_singleSelectBox;
    }
}

function getValidatedWidgetConfig(widgetConfig, searchFieldMode, guestsFieldMode) {
    if (searchFieldMode === 'google') {
        return {
            ...widgetConfig,
            urlTransformerScheme: 'encoded_google_places'
        };
    }
    return widgetConfig;
}

storiesOf('Demo', module)
    .addDecorator(withKnobs)
    .add(
        'default',
        () => {
            const GROUP_IDS = {
                GENERAL:      'GENERAL',
                SEARCH_FIELD: 'SEARCH_FIELD',
                DATES_FIELDS: 'DATES_FIELDS',
                GUESTS_FIELD: 'GUESTS_FIELD'
            };

            const width = number(
                'width',
                1100,
                {
                    range: true,
                    min:   320,
                    max:   1200,
                    step:  1,
                },
                GROUP_IDS.GENERAL
            );

            const _widgetConfig = object('widgetConfig', widgetConfig, GROUP_IDS.GENERAL);

            const searchFieldMode = select(
                'Choose Search Field mode',
                {
                    single_select_box: 'single',
                    multi_select_box:  'multi',
                    google_places:     'google',
                    nested_dropdown:   'nested'
                },
                'single',
                GROUP_IDS.SEARCH_FIELD
            );

            const guestsFieldMode = select(
                'Choose Guests Field mode',
                {
                    single_select_box: 'single',
                    plus_minus:        'plus_minus',
                },
                'single',
                GROUP_IDS.GUESTS_FIELD
            );

            const searchFieldConfig     = getSearchFieldConfig(searchFieldMode);
            const guestsFieldConfig     = getGuestsFieldConfig(guestsFieldMode);
            const validatedWidgetConfig = getValidatedWidgetConfig(_widgetConfig, searchFieldMode, guestsFieldMode);

            return (
                <React.Fragment>
                    <Marked md={ `
## Rentivo Search Widget Demo
On this page you can test all combinations of configs. __Be careful with testing of \`urlTransformerScheme\`__, because schemes which different from default, compatible only with certain combinations of 'searchFieldMode' and 'guestsFieldMode'
            ` }/>
                    <URLToRedirect/>
                    <PreviewComponent>
                        <WidgetWrapper width={ width }>
                            <Searchbar
                                { ...validatedWidgetConfig }
                                searchField={ object('searchFields config', searchFieldConfig, GROUP_IDS.SEARCH_FIELD) }
                                guestsField={ object('guestsField config', guestsFieldConfig, GROUP_IDS.GUESTS_FIELD) }
                                datesFields={ object('datesFields config', datesFields, GROUP_IDS.DATES_FIELDS) }
                            />
                        </WidgetWrapper>
                    </PreviewComponent>
                </React.Fragment>
            );
        }
    );