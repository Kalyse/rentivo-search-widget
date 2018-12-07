export const widgetConfig = {
    baseUrl:              `${ window.location.protocol }//${ window.location.host }/`,
    searchBtnText:        'Search',
    urlTransformerScheme: 'default',
    appendString:         '',
};

export const datesFields = {
    startDateId:              'checkIn',
    endDateId:                'checkOut',
    inputDateFormat:          'DD/MM/YYYY',
    urlDateFormat:            'YYYY-MM-DD',
    appendToBody:             false,
    numberOfMonths:           2,
    startDatePlaceholderText: 'Start Date',
    endDatePlaceholderText:   'End Date'
};