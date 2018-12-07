## URL transformer schemes

At the moment there are 3 URL transformer schemes:

1. default: <br>
`[BASE_URL]/[WOEID -optional]/location[]:[LOCATION_ABBREVIATIONS]/checkIn:[START_DATE]/checkOut:[END_DATE]/sleeps:[NUMBER][APPEND_STRING -optional]`

2. encoded_google_places: <br>
`[BASE_URL]/checkIn:[START_DATE]/checkOut:[END_DATE]/sleeps:[NUMBER][geo:GEOCODING_RESULTS][APPEND_STRING -optional]`

3. alternative: <br>
`[BASE_URL]/[LOCATION_ABBREVIATION]/[NUMBER]-bedrooms.html?from=[START_DATE]&to=[END_DATE][APPEND_STRING -optional]`

### transcriptions for some fields
`BASE_URL` - URL, defined in the widgetConfig 
 
`WOEID` - (Where On Earth IDentifier) is a unique 32-bit reference identifier, originally defined by GeoPlanet and now assigned by Yahoo!, that identifies any feature on Earth

`GEOCODING_RESULTS` - stringified and encoded with base64 encoder json object, gotten from google places API. See detailed description here - https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResults