import React from 'react';

import { storiesOf } from '@storybook/react';

import Layout from './HelperComponents/Layout';
import Searchbar from '../../src/components/Searchbar/Searchbar';

import searchFieldConfig_singleSelectBox from '../jsonExamples/searchField--singleSelectBox';
import searchFieldConfig_multiSelectBox from '../jsonExamples/searchField--multiSelectBox';
import searchFieldConfig_googlePlaces from '../jsonExamples/searchField--googlePlaces';
import searchFieldConfig_nestedDropdown from '../jsonExamples/searchField--nestedDropdown';

import guestsFieldConfig_singleSelectBox from '../jsonExamples/guestsField--singleSelectBox';

import datesFieldsConfig from '../jsonExamples/datesFields';

// deprecated
storiesOf('ugly/"Search Field" modes', module)
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
    ))
    .add('"nested_dropdown" mode', () => (
        <Layout>
            <Searchbar
                searchField={ { ...searchFieldConfig_nestedDropdown } }
                guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                datesFields={ { ...datesFieldsConfig } }
            />
        </Layout>
    ));
