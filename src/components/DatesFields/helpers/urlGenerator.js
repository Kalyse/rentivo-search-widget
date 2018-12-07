export function generateDatesFieldsPart({ startDate, endDate }, { startDateId, endDateId, urlDateFormat }) {
    const urlChunks = [];

    if (startDate) {
        urlChunks.push(`${ startDateId }:${ startDate.format(urlDateFormat) }`);
    }

    if (endDate) {
        urlChunks.push(`${ endDateId }:${ endDate.format(urlDateFormat) }`);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}

export function generateCustomDatesFieldsPart({ startDate, endDate }, { startDateId, endDateId, urlDateFormat }) {
    const urlChunks = [];

    if (startDate) {
        urlChunks.push(`${ startDateId }=${ startDate.format(urlDateFormat) }`);
    }

    if (endDate) {
        urlChunks.push(`${ endDateId }=${ endDate.format(urlDateFormat) }`);
    }

    if (urlChunks.length) {
        return '?' + urlChunks.join('&');
    }

    return null;
}
