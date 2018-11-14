import { UIConfig } from './constants'

export default class PanelsManager {
    constructor(API) {
        this.storybookAPI = API;
        this.state        = this.getInitState();
        this.configureStorybookUI();
        this.registerFullscreenToggler();
    }

    getInitState = () => ({
        showAddonPanel:   this.storybookAPI.getQueryParam('showAddonPanel') || UIConfig.showAddonPanel,
        showStoriesPanel: this.storybookAPI.getQueryParam('showStoriesPanel') || UIConfig.showStoriesPanel
    });

    registerFullscreenToggler = () => {
        if (!window.__STORYBOOK_ADDONS) {
            throw new Error('Accessing nonexistent global object "__STORYBOOK_ADDONS"');
        }

        window.__STORYBOOK_ADDONS.toggleFullscreen = () => {
            this.setState({
                showAddonPanel:   !this.state.showAddonPanel,
                showStoriesPanel: !this.state.showStoriesPanel
            });

            this.configureStorybookUI()
        }
    };

    configureStorybookUI = () => {
        this.storybookAPI.setOptions({
            ...UIConfig,
            showAddonPanel:   this.state.showAddonPanel,
            showStoriesPanel: this.state.showStoriesPanel
        });

        this.storybookAPI.setQueryParams({
            showAddonPanel:   this.state.showAddonPanel,
            showStoriesPanel: this.state.showStoriesPanel
        });
    };

    setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        };
    };
}