import { UIConfig } from './constants';
import 'url-polyfill';

export default class PanelsManager {
    constructor(API) {
        this.storybookAPI = API;
        this.state        = this.getInitState();
        this.configureStorybookUI();
        this.registerFullscreenToggler();
    }

    getInitState = () => {
        const url_string = window.location.href;
        const url        = new URL(url_string);

        const showStoriesPanel = JSON.parse(url.searchParams.get("showStoriesPanel")) !== null
            ? JSON.parse(url.searchParams.get("showStoriesPanel"))
            : UIConfig.showStoriesPanel;
        const showAddonPanel   = JSON.parse(url.searchParams.get("showAddonPanel")) !== null
            ? JSON.parse(url.searchParams.get("showAddonPanel"))
            : UIConfig.showAddonPanel;

        return {
            showStoriesPanel,
            showAddonPanel
        }
    };

    registerFullscreenToggler = () => {
        if (!window.__STORYBOOK_ADDONS) {
            throw new Error('Accessing nonexistent global object "__STORYBOOK_ADDONS"');
        }

        window.__STORYBOOK_ADDONS.toggleStoriesPanel = (e) => {
            if (this.state.showStoriesPanel === true) {
                e.target.textContent = 'Show Stories Panel'
            } else {
                e.target.textContent = 'Hide Stories Panel'
            }

            this.setState({
                showStoriesPanel: !this.state.showStoriesPanel
            });
        };

        window.__STORYBOOK_ADDONS.toggleAddonPanel = (e) => {
            if (this.state.showAddonPanel === true) {
                e.target.textContent = 'Show Addons Panel'
            } else {
                e.target.textContent = 'Hide Addons Panel'
            }

            this.setState({
                showAddonPanel: !this.state.showAddonPanel,
            });
        };
    };

    setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        };

        this.configureStorybookUI()
    };

    configureStorybookUI = () => {
        this.storybookAPI.setQueryParams({
            showStoriesPanel: this.state.showStoriesPanel,
            showAddonPanel:   this.state.showAddonPanel
        });

        this.storybookAPI.setOptions({
            ...UIConfig,
            showStoriesPanel: this.state.showStoriesPanel,
            showAddonPanel:   this.state.showAddonPanel
        });
    };
}