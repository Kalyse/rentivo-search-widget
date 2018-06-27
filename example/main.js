$(function () {
    $('#root').rentivoSearchbar({
        baseUrl: 'https://www.italianbreaks.com/',
        guestsField: {
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
                ]
            },
            initialValue: '1'
        },
        searchField: {
            mode: 'SingleSelectBox',
            placeholder: 'Where do you want to go?',
            searchSchema: {
                "categoryTitle": "Destinations",
                "categoryKey": "location",
                "categoryValue": [
                    {
                        "itemTitle": "Tuscany",
                        "itemValue": "TU",
                        "WOEID": "7153345"
                    },
                    {
                        "itemTitle": "Sorrento and Amalfi",
                        "itemValue": "NR",
                        "WOEID": "724362"
                    },
                ]
            }
        }
    });
});
