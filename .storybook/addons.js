import '@storybook/addon-options/register';
import '@storybook/addon-knobs/register';
import 'storybook-readme/register';
import '@storybook/addon-links/register';
import addonAPI from "@storybook/addons";

import PanelsManager from './PanelsManager';

addonAPI.register('rentivo/options', storybookAPI => new PanelsManager(storybookAPI));

