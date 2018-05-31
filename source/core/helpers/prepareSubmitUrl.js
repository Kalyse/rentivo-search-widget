const prepareUrl = (state, props) => {
    const urlChunks = [];
    const searchFieldPart = _prepareSearchFieldPart(state.searchField.value, props.searchField.searchSchema);
    const datesFieldsPart = _prepareDatesPart(state.datesFields, props.datesFields);
    const guestsFieldPart = _prepareGuestsPart(state.guestsField.value, props.guestsField.guestsSchema);

    if (searchFieldPart) {
        urlChunks.push(searchFieldPart);
    }

    if (datesFieldsPart) {
        urlChunks.push(datesFieldsPart);
    }

    if (guestsFieldPart) {
        urlChunks.push(guestsFieldPart);
    }

    return urlChunks.join('/');
};

const _prepareSearchFieldPart = (chosenItems, searchSchema) => {
    const urlChunks = [];
    const searchFieldPart = {};

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

const _prepareDatesPart = ({ startDate, endDate }, { startDateId, endDateId }) => {
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

const _prepareGuestsPart = (chosenItem, guestsSchema) => `${ guestsSchema.categoryKey }:${ chosenItem }`;

export default prepareUrl;
