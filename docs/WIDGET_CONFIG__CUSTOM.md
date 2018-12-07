## Custom Widget Config

Is used to change general widget settings for certain Search Field's items when they chosen

CustomWidgetConfig interface is have the same properties as WidgetConfig except 'searchField'. All properties are optional

### CustomWidgetConfig interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">baseUrl</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            First part of url to redirect which will be generated after click "submit"
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
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            <p><code>
                <b>Possible values:</b>
            default, encoded_google_places, alternative
            </code></p>
            Depends on chosen scheme, url to redirect is generated in different ways. See detailed description in the story 'Url transformer methods' 
        </td>
    </tr>
    <tr>
        <td valign="top">searchBtnText</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Text displayed on the search button
        </td>
    </tr>
    <tr>
        <td valign="top">datesFields</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                DatesFields
            </code></p>
            Object which contains data for rendering a field. See detailed description in the story 'Dates Fields'
        </td>
    </tr>
    <tr>
        <td valign="top">guestsField</td>
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