export const asterix = (itemValue) => {
    return `${itemValue}*`;
};

export const itemValueTransformer = (value, transformer) => {
    switch (transformer) {
        case 'asterix':
            return asterix(value);
        default:
            return value;
    }
};
