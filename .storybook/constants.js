import { themes } from '@storybook/components';

export const UIConfig = {
    name:              'Rentivo Search Widget Storybook',
    url:               'https://github.com/aptenex/rentivo-search-widget',
    addonPanelInRight: true,
    showAddonPanel:    false,
    showStoriesPanel:  false,
    theme:             {
        ...themes.normal,
        mainFill: 'rgba(255,255,255,1)',
    }
};