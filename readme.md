# rentivo-search-widget
Rentivo standalone search widget. (Suitable for use only with Rentivo platforms). 


### Run project on development mode
```
npm start
```
### Build project
```
npm run build
```
### Documentation
To start working with rentivo-search-widget on your html page, just add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" href="jquery.rentivo-searchbar.css"/>
```
Then, before your closing ```<body>``` tag add:

```html
<script type="text/javascript" src="jquery.rentivo-searchbar.js"></script>
```
Remember, that rentivo-search-widget is jquery dependent, so you have to connect jquery library before connecting `jquery.rentivo-searchbar.js`
#### Widget modes
There are 3 modes in which widget works: `SingleSelectBox`, `MultiSelectBox` and `GooglePlaces`.

In `SingleSelectBox` mode widget's search field works like first example on [Select2 documentation page](https://select2.org/getting-started/basic-usage#single-select-boxes)

In `MultiSelectBox` mode widget's search field works like [pillbox](https://select2.org/getting-started/basic-usage#multi-select-boxes-pillbox) example.

In `GooglePlaces` mode you have a simple input, and when you start to print a destination address, appears a dropdown list with appropriate locations. You have to click on the one of location and it will fill the search field
### Default settings and description for widget except searchField settings:
```js
const defaultSettings = {
    baseUrl: 'http://localhost:3000/', // required; default: your current domain
    appendString: "?aff=123", // default: ''; appends to the end of generated url;
    datesFields: { // settings for check-in and check-out fields 
        startDateId:      'checkIn', // default: 'checkIn'; id for check-in field
        endDateId:        'checkOut', // default: 'checkOut'; id for check-in field
        initialStartDate: null, // default: null; if you want to set initial start date - set momentjs object with your date 
        initialEndDate:   null, // the same as for initialStartDate
        dateFormat:       'DD/MM/YYYY' // if you want to change this format - use formats for momentjs
    },
    guestsField: { // settings for guests field
        guestsSchema: require('~core/jsonDataExamples/guestsSchema.json'), // required; default: see schema in the folder '/source/core/jsonDataExamples'
        initialValue: '1'
    }
};
````
### Basic usage of widget in `SingleSelectBox` mode:

```js
$(function () {
    $('.widget-selector').rentivoSearchbar({
        ...defaultSettings,
        searchField: {
            mode: 'SingleSelectBox', // required; default: 'SingleSelectBox'
            placeholder: 'Where do you want to go?',
            searchSchema: {
                "categoryTitle": "Destinations", // in SingleSelectBox mode is useless. Left in case if will need to add a label for field or something like
                "categoryKey": "location", // using as a key when generating the link for redirecting; for example: http://localhost:3000/location:TU
                "categoryValue": [ // the list of possible values 
                    {
                        "itemTitle": "Tuscany", // Showing as a title in dropdown list of destinations
                        "itemValue": "TU", // using as a value when generating the link 
                        "WOEID": "7153345" // if specified - uses as prefix for generated part of url; For example: http://localhost:3000/7153345/location:TU
                    },
                    {
                        "itemTitle": "Sorrento and Amalfi",
                        "itemValue": "NR"
                    },
                ]
            }
        }
    });
});
```
### Basic usage of widget in `MultiSelectBox` mode:

```js
$(function () {
    $('.widget-selector').rentivoSearchbar({
        ...defaultSettings,
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
                },
            ]
        }
    });
});
```
### Basic usage of widget in `GooglePlaces` mode:

```js
$(function () {
    $('.widget-selector').rentivoSearchbar({
        ...defaultSettings,
        searchField: {
            mode: 'GooglePlaces', // required; default: 'SingleSelectBox'
            API_KEY: 'YOUR_OWN_GOOGLE_API_KEY', // required; default: N/A; needs to work with google places API
            placeholder: 'Search Places ...'
        }
    });
});
```

In this mode data gotten from google places API converting to string, encoding in base64 format and appending to the url

