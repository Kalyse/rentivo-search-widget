export function generateSingleSelectBoxPart(chosenItemValue, data) {
    return `${ data.categoryKey }:${ chosenItemValue }`;
}

export function generateCustomSingleSelectBoxPart(chosenItemValue, data) {
    return `${ chosenItemValue }-${ data.categoryKey }.html`;
}
