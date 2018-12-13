import { itemValueTransformer } from '../../../../core/helpers/itemValueTransformers';

export function generatePlusMinusDropdownPart() {
    const urlChunks = [];

    const { activeOptions, activeCategories } = this.getActiveEntities();

    activeCategories.forEach(({ id, value, valueTransformer }) => {
        const ownActiveOptionsId = this.props.categories[id].optionsId.filter(optionId => Object.keys(activeOptions).includes(optionId));

        urlChunks.push(`${ id }[]:${ itemValueTransformer(value, valueTransformer) }`);
        ownActiveOptionsId.forEach(id => urlChunks.push(`${ id }[]:${ itemValueTransformer(activeOptions[id], valueTransformer) }`))
    });

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}
