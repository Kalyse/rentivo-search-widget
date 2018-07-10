$(function () {

        $('#root').rentivoSearchbar({
            baseUrl: 'http://localhost:3000/', // required; default: your current domain
            appendString: "?aff=123", // default: ''; appends to the end of generated url;
            datesFields: { // settings for check-in and check-out fields
                startDateId: 'checkIn', // default: 'checkIn'; id for check-in field
                endDateId: 'checkOut', // default: 'checkOut'; id for check-in field
                initialStartDate: null, // default: null; if you want to set initial start date - set momentjs object with your date
                initialEndDate: null, // the same as for initialStartDate
                dateFormat: 'DD/MM/YYYY', // if you want to change this format - use formats for momentjs
                appendToBody: false // If the wrapping element has overflow hidden, set to true
            },
            guestsField: { // settings for guests field
                guestsSchema: {
                    "categoryTitle": "Accommodates",
                    "categoryKey": "sleeps",
                    "categoryValue": [
                        {
                            "itemTitle": "1 Guest",
                            "itemValue": "1"
                        },
                        {
                            "itemTitle": "2 Guests",
                            "itemValue": "2"
                        },
                        {
                            "itemTitle": "3 Guests",
                            "itemValue": "3"
                        },
                        {
                            "itemTitle": "4 Guests",
                            "itemValue": "4"
                        },
                        {
                            "itemTitle": "5 Guests",
                            "itemValue": "5"
                        },
                        {
                            "itemTitle": "6 Guests",
                            "itemValue": "6"
                        },
                        {
                            "itemTitle": "7 Guests",
                            "itemValue": "7"
                        },
                        {
                            "itemTitle": "8 Guests",
                            "itemValue": "8"
                        },
                        {
                            "itemTitle": "9 Guests",
                            "itemValue": "9"
                        },
                        {
                            "itemTitle": "10 Guests",
                            "itemValue": "10"
                        },
                        {
                            "itemTitle": "11 Guests",
                            "itemValue": "11"
                        },
                        {
                            "itemTitle": "12 Guests",
                            "itemValue": "12"
                        },
                        {
                            "itemTitle": "13 Guests",
                            "itemValue": "13"
                        },
                        {
                            "itemTitle": "14 Guests",
                            "itemValue": "14"
                        },
                        {
                            "itemTitle": "15 Guests",
                            "itemValue": "15"
                        },
                        {
                            "itemTitle": "16+ Guests",
                            "itemValue": "16"
                        }
                    ]
                },
                initialValue: '1'
            },
            searchField: {
                mode: 'MultiSelectBox', // required; default: 'SingleSelectBox'
                placeholder: 'Where do you want to go?',
                searchSchema: [ // array of categories
                    {
                        "categoryTitle": "Popular in Italy", // required; separate groups in dwopdown list of field
                        "singleResult": true, // required; if true - it's possible to choose only one item in group
                        "categoryKey": "location", // the same as for SingleSelectBox
                        "categoryValue": [ // the same as for SingleSelectBox
                            {
                                "itemTitle": "Tuscany", // the same as for SingleSelectBox
                                "itemValue": "TU", // the same as for SingleSelectBox
                                "WOEID": "7153345" // in MultiSelectBox mode works only for "singleResult" group
                            },
                            {
                                "itemTitle": "Sorrento and Amalfi",
                                "itemValue": "NR",
                                "WOEID": "710100"
                            },
                            {
                                "itemTitle": "Sicily",
                                "itemValue": "SI",
                                "WOEID": "7153344"
                            }
                        ]
                    }
                ]
            }
        });
});
