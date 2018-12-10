## Search Field in "google_places" mode

<!-- STORY -->

This field uses "Google Places Autocomplete Service".

In `google_places` mode you have a simple input, and when you start to print a destination address, appears a dropdown list with appropriate locations. You have to click on the one of location and it will fill the search field
### SearchField.GooglePlaces interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">mode*</td>
        <td valign="top">google_places</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Flag that says to widget which field's mode should be used
        </td>
    </tr>
    <tr>
        <td valign="top">placeholder</td>
        <td valign="top">Search Places ...</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Visible while input is empty
        </td>
    </tr>
    <tr>
        <td valign="top">API_KEY*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Your google places API key
        </td>
    </tr>
    <tr>
        <td valign="top">searchOptions</td>
        <td valign="top">
<pre style="margin: 0; padding: 0">
{
  componentRestrictions: {
    country: 'uk'
  }
}
</pre>
        </td>
        <td valign="top">
            <p>
                <code>
                    <strong>Type:</strong> 
                    <a target="_blank" href="https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest">AutocompletionRequest</a>
                </code>
            </p>
            Object to be sent to Google Places Autocomplete Service. For more details see <br><a target="_blank" href="https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest">Places Autocomplete Service documentation</a>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>