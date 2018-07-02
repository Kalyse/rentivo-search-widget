$(function () {

        $('#root').rentivoSearchbar({
            baseUrl: 'http://localhost:3000/', // required; default: your current domain
            appendString: "?aff=123", // default: ''; appends to the end of generated url;
            datesFields: { // settings for check-in and check-out fields
                startDateId: 'checkIn', // default: 'checkIn'; id for check-in field
                endDateId: 'checkOut', // default: 'checkOut'; id for check-in field
                initialStartDate: null, // default: null; if you want to set initial start date - set momentjs object with your date
                initialEndDate: null, // the same as for initialStartDate
                dateFormat: 'DD/MM/YYYY' // if you want to change this format - use formats for momentjs
            },
            guestsField: { // settings for guests field
                guestsSchema: {
                    "categoryTitle": "Pets",
                    "categoryKey": "pets_i",
                    "categoryValue": [
                        {
                            "itemTitle": "1 Dog",
                            "itemValue": "1 Dog"
                        },
                        {
                            "itemTitle": "2 Dogs",
                            "itemValue": "2"
                        },
                        {
                            "itemTitle": "3 Dogs+",
                            "itemValue": "3"
                        }
                    ]
                },
                initialValue: '1'
            },
            searchField: {
                mode: 'GooglePlaces',
                API_KEY: 'AIzaSyAzoHVEPS9zt7mK97TL9TTZJjYi-RCPPgE',
                componentRestrictions: {
                    country: 'uk'
                }
            }
        });
});
