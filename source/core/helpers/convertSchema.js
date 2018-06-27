export const convertSchemaToMultiSelectBoxData = (json) => {
    return json.map(({ categoryTitle, categoryValue, singleResult }, categoryIdx) => {
        return {
            text: categoryTitle,
            children: categoryValue
                .map(({ itemTitle: text }, itemIdx) => ({
                    text,
                    id: `${ categoryIdx }/${ itemIdx }`
                })),
            "data-single-result": String(singleResult)
        };
    });
};

export const convertSchemaToSingleSelectBoxData = (json) => {
    return json.categoryValue.map(({ itemTitle: text, itemValue: id }) => ({ text, id }));
};
