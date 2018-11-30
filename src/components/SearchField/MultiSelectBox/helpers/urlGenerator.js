function _getWoeid(chosenItems, data) {
    let woeid = null;

    chosenItems.forEach((item) => {
        const [categoryIdx, itemIdx] = item.split('/');
        const { singleResult }       = data[categoryIdx];

        if (!singleResult) {
            return;
        }

        woeid = data[categoryIdx].categoryValue[itemIdx].WOEID;
    });

    return woeid;
}

export function generateMultiSelectBoxPart(chosenItems, data) {
    const urlChunks       = [];
    const WOEID           = _getWoeid(chosenItems, data);
    const searchFieldPart = {};

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    chosenItems.forEach((item) => {
        const [categoryIdx, itemIdx] = item.split('/');
        const { categoryKey }        = data[categoryIdx];
        const { itemValue }          = data[categoryIdx].categoryValue[itemIdx];

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
