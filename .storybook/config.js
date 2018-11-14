import "@babel/polyfill";

import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { UIConfig } from "./constants";
import loadStories from '../stories';


addDecorator(
    withOptions(UIConfig)
);

configure(loadStories, module);
