import "@babel/polyfill";

import { configure } from '@storybook/react';
import loadStories from '../stories';

configure(loadStories, module);
