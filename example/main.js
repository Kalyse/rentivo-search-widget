$(function () {
    $('#root').rentivoSearchbar({
        "baseUrl":              "http://localhost:9001/",
        "searchBtnText":        "Search",
        "urlTransformerScheme": "default",
        "appendString":         "",
        datesFields:            {
            "startDateId":              "checkIn",
            "endDateId":                "checkOut",
            "inputDateFormat":          "DD/MM/YYYY",
            "urlDateFormat":            "YYYY-MM-DD",
            "appendToBody":             false,
            "numberOfMonths":           2,
            "startDatePlaceholderText": "Start Date",
            "endDatePlaceholderText":   "End Date"
        },
        guestsField:            {
            "mode":           "plus_minus",
            "placeholder":    "Select guests number",
            "incDecInterval": 150,
            "data":           [
                {
                    "categoryTitle":    "Guests",
                    "categoryKey":      "guests",
                    "placeholderOrder": 2,
                    "categoryValue":    [
                        {
                            "itemTitle": "Adults",
                            "itemKey":   "adults",
                            "minNumber": 2,
                            "maxNumber": 17
                        },
                        {
                            "itemTitle": "Children",
                            "itemKey":   "children",
                            "minNumber": 0,
                            "maxNumber": 5
                        },
                        {
                            "itemTitle": "Infants",
                            "itemKey":   "infants",
                            "minNumber": 0,
                            "maxNumber": 5
                        }
                    ]
                },
                {
                    "categoryTitle":    "Pets",
                    "categoryKey":      "pets",
                    "placeholderOrder": -1,
                    "categoryValue":    [
                        {
                            "itemTitle": "Dogs",
                            "itemKey":   "dogs",
                            "minNumber": 0,
                            "maxNumber": 3
                        },
                        {
                            "itemTitle": "Cats",
                            "itemKey":   "cats",
                            "minNumber": 0,
                            "maxNumber": 3
                        }
                    ]
                },
                {
                    "categoryTitle": "Other",
                    "categoryKey":   "other",
                    "categoryValue": [
                        {
                            "itemTitle": "Imaginary friends",
                            "itemKey":   "imaginary_friends",
                            "minNumber": 0,
                            "maxNumber": 10
                        }
                    ]
                }
            ]
        },
        searchField:            {
            "mode":            "nested_dropdown",
            "placeholder":     "Where do you want to go?",
            "menuTitlePrefix": "All villas in ",
            "data":            {
                "name":         "Asia",
                "pathFragment": "search",
                "children":     [
                    {
                        "name":         "Thailand",
                        "pathFragment": "thailand",
                        "children":     [
                            {
                                "name":         "Koh Samui",
                                "pathFragment": "koh-samui",
                                "children":     [
                                    {
                                        "name":         "Ban Tai",
                                        "pathFragment": "ban-tai"
                                    },
                                    {
                                        "name":         "Bang Por",
                                        "pathFragment": "bang-por"
                                    }
                                ]
                            },
                            {
                                "name":         "Phuket",
                                "pathFragment": "phuket",
                                "children":     [
                                    {
                                        "name":         "Koh Yao",
                                        "pathFragment": "koh-yao"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name":               "Indonesia",
                        "pathFragment":       "indonesia",
                        "children":           [
                            {
                                "name":         "Bali",
                                "pathFragment": "bali",
                                "children":     [
                                    {
                                        "name":         "Sanur",
                                        "pathFragment": "sanur"
                                    },
                                    {
                                        "name":         "Ubud",
                                        "pathFragment": "ubud"
                                    }
                                ]
                            }
                        ],
                        "customWidgetConfig": {
                            "baseUrl":      "http://new-base-url.com/",
                            "appendString": "?qwerty=dvorak",
                            "datesFields":  {
                                "startDateId": "CustomStartDateId",
                                "endDateId":   "CustomEndDateId"
                            }
                        }
                    }
                ]
            }
        }
    });
});
