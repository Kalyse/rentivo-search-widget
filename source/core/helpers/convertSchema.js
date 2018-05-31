export const convertSchemaToSearchFieldData = (json) => {
    return json.map(({ categoryTitle, categoryValue }, categoryIdx) => {
        return {
            text: categoryTitle,
            children: categoryValue
                .map(({ itemTitle: text }, itemIdx) => ({
                    text,
                    id: `${ categoryIdx }/${ itemIdx }`
                }))
        };
    });
};

export const convertSchemaToGuestsFieldData = (json) => {
    return json.categoryValue.map(({ itemTitle: text, itemValue: id }) => ({
        text,
        id
    }));
};
