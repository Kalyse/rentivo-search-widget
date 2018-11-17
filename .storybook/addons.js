import 'storybook-readme/register';
import '@storybook/addon-links/register';
import '@storybook/addon-options/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-console';
import addonAPI from "@storybook/addons";

import PanelsManager from './PanelsManager';

addonAPI.register('rentivo/options', storybookAPI => new PanelsManager(storybookAPI));

