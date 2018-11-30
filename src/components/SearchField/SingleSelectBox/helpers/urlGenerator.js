export function generateSingleSelectBoxPart(chosenItemValue, searchSchema) {
    const urlChunks = [];
    const WOEID     = searchSchema.categoryValue.find(({ itemValue }) => itemValue === chosenItemValue).WOEID;

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    urlChunks.push(`${ searchSchema.categoryKey }[]:${ chosenItemValue }`);

    return urlChunks.join('/');
}
