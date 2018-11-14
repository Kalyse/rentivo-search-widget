import '@storybook/addon-links/register';
import '@storybook/addon-options/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-console';
import 'storybook-readme/register';
import addonAPI from '@storybook/addons';

import { UIConfig } from "./constants";

addonAPI.register('rentivo/options', (storybookAPI) => {
    if (!window.__STORYBOOK_ADDONS) return;

    let { showAddonPanel }   = UIConfig;
    let { showStoriesPanel } = UIConfig;

    window.__STORYBOOK_ADDONS.toggleFullscreen = () => {
        showAddonPanel   = !showAddonPanel;
        showStoriesPanel = !showStoriesPanel;

        storybookAPI.setOptions({
            ...UIConfig,
            showAddonPanel,
            showStoriesPanel
        })
    }
});
