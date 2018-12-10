export function generateNestedDropdownPart() {
    const urlChunks = [];

    if (this.props.rootMenus[this.state.currentRootMenuId]) {
        urlChunks.push(this.props.rootMenus[this.state.currentRootMenuId].pathFragment);
    }

    if (this.state.selectedOptionId) {
        this.state.openSubmenusId.forEach(submenuId => {
            urlChunks.push(this.props.submenus[submenuId].pathFragment);
        });

        urlChunks.push(this.props.options[this.state.selectedOptionId].pathFragment);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}

export function generateCustomNestedDropdownPart() {
    const normalPart = generateNestedDropdownPart.call(this);

    if (normalPart) {
        return normalPart + '/';
    }

    return null;
}
