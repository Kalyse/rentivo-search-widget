import { UIConfig } from './constants'

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
        return {
            showAddonPanel:   JSON.parse(url.searchParams.get("showAddonPanel")) || UIConfig.showAddonPanel,
            showStoriesPanel: JSON.parse(url.searchParams.get("showStoriesPanel")) || UIConfig.showStoriesPanel
        }
    };

    registerFullscreenToggler = () => {
        if (!window.__STORYBOOK_ADDONS) {
            throw new Error('Accessing nonexistent global object "__STORYBOOK_ADDONS"');
        }

        window.__STORYBOOK_ADDONS.toggleFullscreen = () => {
            this.setState({
                showAddonPanel:   !this.state.showAddonPanel,
                showStoriesPanel: !this.state.showStoriesPanel
            });
        }
    };

    configureStorybookUI = () => {
        this.storybookAPI.setQueryParams({
            showAddonPanel:   this.state.showAddonPanel,
            showStoriesPanel: this.state.showStoriesPanel
        });

        this.storybookAPI.setOptions({
            ...UIConfig,
            showAddonPanel:   this.state.showAddonPanel,
            showStoriesPanel: this.state.showStoriesPanel
        });
    };

    setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        };

        this.configureStorybookUI()
    };
}