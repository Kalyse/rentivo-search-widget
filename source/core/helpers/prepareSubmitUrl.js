import { b64EncodeUnicode } from './base64';

export const generateMultiSelectBoxPart = (chosenItems, searchSchema) => {
    const urlChunks = [];
    const WOEID = _getWoeidFromChosenItemsMSB(chosenItems, searchSchema);
    const searchFieldPart = {};

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    chosenItems.forEach((item) => {
        const [ categoryIdx, itemIdx ] = item.split('/');
        const { categoryKey } = searchSchema[ categoryIdx ];
        const { itemValue } = searchSchema[ categoryIdx ].categoryValue[ itemIdx ];

        if (!searchFieldPart.hasOwnProperty(categoryKey)) {
            searchFieldPart[categoryKey] = [];
        }

        searchFieldPart[categoryKey].push(itemValue);
    });

    for(const category in searchFieldPart) {
        const strValues = searchFieldPart[category].join(',');
        urlChunks.push(`${ category }[]:${ strValues }`);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
};

export const generateSingleSelectBoxPart = (chosenItemValue, searchSchema) => {
    const urlChunks = [];
    const WOEID = _getWoeidFromChosenItemsSSB(chosenItemValue, searchSchema);

    if (WOEID) {
        urlChunks.push(WOEID);
    }

    urlChunks.push(`${ searchSchema.categoryKey }:${ chosenItemValue }`);

    return urlChunks.join('/');
};

export const generateDatesFieldsPart = ({ startDate, endDate }, { startDateId, endDateId }) => {
    const urlChunks = [];

    if ( startDate ) {
        urlChunks.push(`${ startDateId }:${ startDate.format('YYYY-MM-DD') }`);
    }

    if ( endDate ) {
        urlChunks.push(`${ endDateId }:${ endDate.format('YYYY-MM-DD') }`);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
};

export const generateGooglePlacesPart = (data) => {
    if (data) {
        return b64EncodeUnicode(JSON.stringify(data));
    }

    return null;
};


/**
 * gets WOEID for MultiSelectBoxMode
 *
 * @param chosenItems
 * @param searchSchema
 * @returns {*}
 * @private
 */

function _getWoeidFromChosenItemsMSB(chosenItems, searchSchema) {
    let woeid = null;

    chosenItems.forEach((item) => {
        const [ categoryIdx, itemIdx ] = item.split('/');
        const { singleResult } = searchSchema[ categoryIdx ];

        if(!singleResult) {
            return;
        }

        woeid = searchSchema[ categoryIdx ].categoryValue[ itemIdx ].WOEID;
    });

    return woeid;
}


/**
 * gets WOEID for SingleSelectBoxMode
 *
 * @param chosenItemValue
 * @param searchSchema
 * @returns {*}
 * @private
 */

function _getWoeidFromChosenItemsSSB(chosenItemValue, searchSchema) {
    return searchSchema.categoryValue.find(item => item.itemValue === chosenItemValue).WOEID;
}