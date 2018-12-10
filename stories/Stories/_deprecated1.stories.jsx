import React from 'react';

import { storiesOf } from '@storybook/react';

import Layout from './HelperComponents/Layout';
import Searchbar from '../../src/components/Searchbar/Searchbar';

import searchFieldConfig_singleSelectBox from '../jsonExamples/searchField--singleSelectBox';

import guestsFieldConfig_singleSelectBox from '../jsonExamples/guestsField--singleSelectBox';
import guestsFieldConfig_plusMinus from '../jsonExamples/guestsField--plusMinus';

import datesFieldsConfig from '../jsonExamples/datesFields';

// deprecated
storiesOf('ugly/"Guests Field" modes', module)
    .add(
        '"single_select_box" mode',
        () => (
            <Layout>
                <Searchbar
                    searchField={ { ...searchFieldConfig_singleSelectBox } }
                    guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                    datesFields={ { ...datesFieldsConfig } }
                />
            </Layout>
        )
    )
    .add(
        '"plus_minus" mode',
        () => (
            <Layout>
                <Searchbar
                    searchField={ { ...searchFieldConfig_singleSelectBox } }
                    guestsField={ { ...guestsFieldConfig_plusMinus } }
                    datesFields={ { ...datesFieldsConfig } }
                />
            </Layout>
        )
    );
