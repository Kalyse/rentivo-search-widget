$(function () {
    $('#root').rentivoSearchbar({
        baseUrl: 'http://localhost:3000/',
        searchSchema: [
            {
                "categoryTitle": "destinations",
                "categoryKey": "location",
                "categoryValue": [
                    {
                        "itemTitle": "Italy",
                        "itemValue": "ITA"
                    },
                    {
                        "itemTitle": "Ukraine",
                        "itemValue": "UKR"
                    },
                    {
                        "itemTitle": "Great Britain",
                        "itemValue": "GBR"
                    }
                ]
            },
            {
                "categoryTitle": "bedrooms",
                "categoryKey": "bedrooms",
                "categoryValue": [
                    {
                        "itemTitle": "1 Room/Studio",
                        "itemValue": "1"
                    },
                    {
                        "itemTitle": "2+ Rooms",
                        "itemValue": "2*"
                    },
                    {
                        "itemTitle": "3+ Rooms",
                        "itemValue": "3*"
                    },
                    {
                        "itemTitle": "4+ Rooms",
                        "itemValue": "4*"
                    }
                ]
            },
            {
                "categoryTitle": "amenities",
                "categoryKey": "amenities",
                "categoryValue": [
                    {
                        "itemTitle": "Pool",
                        "itemValue": "pool"
                    },
                    {
                        "itemTitle": "Air Con",
                        "itemValue": "conditioning"
                    },
                    {
                        "itemTitle": "Close to Sea",
                        "itemValue": "coastal"
                    },
                    {
                        "itemTitle": "Internet",
                        "itemValue": "internet"
                    }
                ]
            }
        ],
    });
});
