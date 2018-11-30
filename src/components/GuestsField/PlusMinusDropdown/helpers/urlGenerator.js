export function generatePlusMinusDropdownPart() {
    const urlChunks = [];

    const { activeOptions, activeCategories } = this.getActiveEntities();

    activeCategories.forEach(({ id, value }) => {
        const ownActiveOptionsId = this.props.categories[id].optionsId.filter(optionId => Object.keys(activeOptions).includes(optionId));

        urlChunks.push(`${ id }[]:${ value }`);
        ownActiveOptionsId.forEach(id => urlChunks.push(`${ id }[]:${ activeOptions[id] }`))
    });

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}
