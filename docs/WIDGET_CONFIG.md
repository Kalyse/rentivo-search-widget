## Widget Config
General widget settings

### WidgetConfig interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">baseUrl</td>
        <td valign="top">current domain</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            First part of url to redirect which will be generated after click "search"
        </td>
    </tr>
    <tr>
        <td valign="top">appendString</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            String to be append to the end of generated url
        </td>
    </tr>
    <tr>
        <td valign="top">urlTransformerScheme</td>
        <td valign="top">default</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            <p><code>
                <b>Possible values:</b>
            default, encoded_google_places, alternative
            </code></p>
            Depends on chosen scheme, url to redirect is generated in different ways. See detailed description in the story 'Url transformer schemes' 
        </td>
    </tr>
    <tr>
        <td valign="top">searchBtnText</td>
        <td valign="top">Search</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Text displayed on the search button
        </td>
    </tr>
    <tr>
        <td valign="top">cookieConfig</td>
        <td valign="top">
<pre>
    {
        isAllowed: true,
        maxAge:    24
    }
</pre>        
        </td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> object
            </code></p>
            isAllowed - allows or denies cookies on the site
            maxAge - cookies life time in hours
        </td>
    </tr>
    <tr>
        <td valign="top">searchField*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                SearchField.SingleSelectBox | SearchField.MultiSelectBox | SearchField.GooglePlaces | SearchField.NestedDropdown 
            </code></p>
            Object which contains data for rendering a field. See detailed description in the story 'Search Field'
        </td>
    </tr>
    <tr>
        <td valign="top">datesFields</td>
        <td valign="top">
<pre style="margin: 0; padding: 0">
{
    startDateId:              'checkIn',
    endDateId:                'checkOut',
    inputDateFormat:          'DD/MM/YYYY',
    urlDateFormat:            'YYYY-MM-DD',
    appendToBody:             false,
    numberOfMonths:           2,
    startDatePlaceholderText: 'Start Date',
    endDatePlaceholderText:   'End Date'
}
</pre>
        </td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                DatesFields
            </code></p>
            Object which contains data for rendering a field. See detailed description in the story 'Dates Fields'
        </td>
    </tr>
    <tr>
        <td valign="top">GuestsField*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                GuestsField.SingleSelectBox | GuestsField.PlusMinus
            </code></p>
            Object which contains data for rendering a field. See detailed description in the story 'Guests Field'
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>