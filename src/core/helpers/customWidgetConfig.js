export function setCustomWidgetConfig(widgetConfig) {
    resetCustomWidgetConfig.call(this);

    if (widgetConfig.datesFields) {
        this.props.context.actions.setCustomDatesFields(widgetConfig.datesFields);
    }
    if (widgetConfig.guestsField) {
        this.props.context.actions.setCustomGuestsField(widgetConfig.guestsField);
    }
    if (widgetConfig.baseUrl) {
        this.props.context.actions.setCustomBaseUrl(widgetConfig.baseUrl);
    }
    if (widgetConfig.appendString) {
        this.props.context.actions.setCustomAppendString(widgetConfig.appendString);
    }
}

export function resetCustomWidgetConfig() {
    if (this.props.context.state.datesFields !== this.props.context.initState.datesFields) {
        this.props.context.actions.setCustomDatesFields(this.props.context.initState.datesFields);
    }
    if (this.props.context.state.guestsField !== this.props.context.initState.guestsField) {
        this.props.context.actions.setCustomGuestsField(this.props.context.initState.guestsField);
    }
    if (this.props.context.state.baseUrl !== this.props.context.initState.baseUrl) {
        this.props.context.actions.setCustomBaseUrl(this.props.context.initState.baseUrl);
    }
    if (this.props.context.state.appendString !== this.props.context.initState.appendString) {
        this.props.context.actions.setCustomAppendString(this.props.context.initState.appendString);
    }
}