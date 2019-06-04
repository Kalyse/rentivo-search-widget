export const widgetConfig = {
    baseUrl:              `${ window.location.protocol }//${ window.location.host }/`,
    searchBtnText:        'Search',
    urlTransformerScheme: 'default',
    appendString:         '',
    openInNewTab:         true
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

export const guestsField = {
    plusMinus: {
        placeholder:    'Select guests number',
        incDecInterval: 150
    }
};

export const searchField = {
    singleSelectBox: {
        placeholder: 'Where do you want to go?',
    },
    multiSelectBox:  {
        placeholder: 'Where do you want to go?'
    },
    googlePlaces:    {
        placeholder:   'Search Places ...',
        searchOptions: {
            componentRestrictions: {
                country: 'uk'
            }
        }
    },
    nestedDropdown:  {
        menuTitlePrefix: 'All villas in ',
        placeholder:     'Where do you want to go?',
    }
};

export const cookieConfig = {
    isAllowed: true,
    maxAge:    24,
    nameSpace: 'DEFAULT'
};
