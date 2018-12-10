export function generateSingleSelectBoxPart(chosenItemValue, data) {
    const urlChunks = [];
    const WOEID     = data.categoryValue.find(({ itemValue }) => itemValue === chosenItemValue).WOEID;

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    urlChunks.push(`${ data.categoryKey }[]:${ chosenItemValue }`);

    return urlChunks.join('/');
}
