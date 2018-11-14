import React from 'react';

import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

import withReadme from 'storybook-readme/with-readme';
import CommonReadme from '../temp/readme.md';

import Layout from '../Layouts/Layout';
import Searchbar from '../../src/components/Searchbar/Searchbar';

import searchFieldConfig_singleSelectBox from '../jsonExamples/searchField--singleSelectBox';

import guestsFieldConfig_singleSelectBox from '../jsonExamples/guestsField--singleSelectBox';
import guestsFieldConfig_plusMinus from '../jsonExamples/guestsField--plusMinus';

import datesFieldsConfig from '../jsonExamples/datesFields';

storiesOf('Examples of "Guests Field" modes', module)
    .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
    .add(
        '"single_select_box" mode',
        withReadme(CommonReadme, () => (
            <Layout>
                <Searchbar
                    searchField={ { ...searchFieldConfig_singleSelectBox } }
                    guestsField={ { ...guestsFieldConfig_singleSelectBox } }
                    datesFields={ { ...datesFieldsConfig } }
                />
            </Layout>
        ))
    )
    .add(
        '"plus_minus" mode',
        withReadme(CommonReadme, () => (
            <Layout>
                <Searchbar
                    searchField={ { ...searchFieldConfig_singleSelectBox } }
                    guestsField={ { ...guestsFieldConfig_plusMinus } }
                    datesFields={ { ...datesFieldsConfig } }
                />
            </Layout>
        ))
    );