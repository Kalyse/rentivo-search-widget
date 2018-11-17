import React from 'react';

import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

import withReadme from 'storybook-readme/with-readme';
import CommonReadme from '../temp/readme.md';

import Layout from './HelperComponents/Layout';
import Searchbar from '../../src/components/Searchbar/Searchbar';

import searchFieldConfig_singleSelectBox from '../jsonExamples/searchField--singleSelectBox';
import searchFieldConfig_multiSelectBox from '../jsonExamples/searchField--multiSelectBox';
import searchFieldConfig_googlePlaces from '../jsonExamples/searchField--googlePlaces';

import guestsFieldConfig_singleSelectBox from '../jsonExamples/guestsField--singleSelectBox';

import datesFieldsConfig from '../jsonExamples/datesFields';

storiesOf('Examples of "Search Field" modes', module)
    .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
    .addDecorator(withReadme(CommonReadme))
    .add('"single_select_box" mode', () => (
        <Layout>
            <Searchbar
                searchField={ { ...searchFieldConfig_singleSelectBox } }
                guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                datesFields={ { ...datesFieldsConfig } }
            />
        </Layout>
    ))
    .add('"multi_select_box" mode', () => (
        <Layout>
            <Searchbar
                searchField={ { ...searchFieldConfig_multiSelectBox } }
                guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                datesFields={ { ...datesFieldsConfig } }
            />
        </Layout>
    ))
    .add('"google_places" mode', () => (
        <Layout>
            <Searchbar
                searchField={ { ...searchFieldConfig_googlePlaces } }
                guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                datesFields={ { ...datesFieldsConfig } }
            />
        </Layout>
    ));