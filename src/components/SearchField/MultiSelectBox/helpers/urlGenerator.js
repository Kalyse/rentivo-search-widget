function _getWoeid(chosenItems, searchSchema) {
    let woeid = null;

    chosenItems.forEach((item) => {
        const [categoryIdx, itemIdx] = item.split('/');
        const { singleResult }       = searchSchema[categoryIdx];

        if (!singleResult) {
            return;
        }

        woeid = searchSchema[categoryIdx].categoryValue[itemIdx].WOEID;
    });

    return woeid;
}

export function generateMultiSelectBoxPart(chosenItems, searchSchema) {
    const urlChunks       = [];
    const WOEID           = _getWoeid(chosenItems, searchSchema);
    const searchFieldPart = {};

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    chosenItems.forEach((item) => {
        const [categoryIdx, itemIdx] = item.split('/');
        const { categoryKey }        = searchSchema[categoryIdx];
        const { itemValue }          = searchSchema[categoryIdx].categoryValue[itemIdx];

        if (!searchFieldPart.hasOwnProperty(categoryKey)) {
            searchFieldPart[categoryKey] = [];
        }

        searchFieldPart[categoryKey].push(itemValue);
    });

    for (const category in searchFieldPart) {
        const strValues = searchFieldPart[category].join(',');
        urlChunks.push(`${ category }[]:${ strValues }`);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}
