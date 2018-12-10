import React from 'react';

import { storiesOf } from '@storybook/react';

import { doc } from 'storybook-readme';
import GettingStartedDocs from '../../README.md';
import WidgetConfigDocs from '~docs/WIDGET_CONFIG.md';
import CustomWidgetConfigDocs from '~docs/WIDGET_CONFIG__CUSTOM.md';
import URLTransformerSchemesDocs from '~docs/URL_TRANSFORMER_SCHEMES.md';

storiesOf('Introduction', module)
    .add('Getting started', doc(GettingStartedDocs))
    .add('Widget Config', doc(WidgetConfigDocs))
    .add('Custom Widget Config', doc(CustomWidgetConfigDocs))
    .add('Url transformer schemes', doc(URLTransformerSchemesDocs));
