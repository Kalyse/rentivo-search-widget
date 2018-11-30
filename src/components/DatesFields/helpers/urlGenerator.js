export function generateDatesFieldsPart({ startDate, endDate }, { startDateId, endDateId }) {
    const urlChunks = [];

    if (startDate) {
        urlChunks.push(`${ startDateId }:${ startDate.format('YYYY-MM-DD') }`);
    }

    if (endDate) {
        urlChunks.push(`${ endDateId }:${ endDate.format('YYYY-MM-DD') }`);
    }

    if (urlChunks.length) {
        return urlChunks.join('/');
    }

    return null;
}

export function generateCustomDatesFieldsPart({ startDate, endDate }, { startDateId, endDateId }) {
    const urlChunks = [];

    if (startDate) {
        urlChunks.push(`${ startDateId }=${ startDate.format('YYYY-MM-DD') }`);
    }

    if (endDate) {
        urlChunks.push(`${ endDateId }=${ endDate.format('YYYY-MM-DD') }`);
    }

    if (urlChunks.length) {
        return '?' + urlChunks.join('&');
    }

    return null;
}
