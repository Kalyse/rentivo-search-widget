import React from 'react';

import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

import Searchbar from '../components/Searchbar/Searchbar';
import searchFieldConfig from './jsonExamples/searchField--multiSelectBox';
import guestsFieldConfig from './jsonExamples/guestsField--singleSelectBox';
import datesFieldsConfig from './jsonExamples/datesFields';

storiesOf('Examples of "Search Field" modes', module)
    .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
    .add('"multi_select_box" mode', () => (
        <Searchbar
            searchField={ { ...searchFieldConfig } }
            guestsField={ { ...guestsFieldConfig } }
            datesFields={ { ...datesFieldsConfig } }
        />
    ));