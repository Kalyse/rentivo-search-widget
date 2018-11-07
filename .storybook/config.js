import "@babel/polyfill";

import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
    name:                   'Rentivo Search Widget Storybook',
    url:                    'https://github.com/aptenex/rentivo-search-widget',
    addonPanelInRight:      true,
    hierarchySeparator:     /\//,
    hierarchyRootSeparator: /\|/
});

// automatically import all files ending in *.stories.js
const req = require.context('../source/stories', true, /.stories.jsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
