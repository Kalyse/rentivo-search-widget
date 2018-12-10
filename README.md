# rentivo-search-widget
Rentivo standalone search widget. (Suitable for use only with Rentivo platforms).

#### [Documentation](https://evisotskiy.github.io/rentivo-search-widget/) | [Demo](https://evisotskiy.github.io/rentivo-search-widget/?selectedKind=Demo&selectedStory=default&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs&showStoriesPanel=true&showAddonPanel=true) | [Source](https://github.com/aptenex/rentivo-search-widget)

### Run project on development mode
```
npm start
```
### Compile widget's files
```
npm run build
```
Compiled files will be placed in the `dist` directory at the project's root
### Build storybook
```
npm run build-storybook
```
Compiled storybook will be placed in the `storybook-static` at the project's root

### Setup
To start working with rentivo-search-widget on your html page, just add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" href="jquery.rentivo-searchbar.css"/>
```
Then, before your closing ```<body>``` tag add:

```html
<script type="text/javascript" src="jquery.rentivo-searchbar.js"></script>
```

Both css and js files are placed in the [dist](https://github.com/aptenex/rentivo-search-widget/tree/master/dist) directory on the repository 

### Dependencies

jQuery is required to use the search bar component. You must connect jquery library before connecting `jquery.rentivo-searchbar.js`

### Usage

When scripts and styles are connected, it's time to initialize widget on your page:

```js
jQuery(document).ready(function( $ ) {
    $('.widget-selector').rentivoSearchbar({
        // WidgetConfig; See detailed description in the WidgetConfig story
    });
})

```
