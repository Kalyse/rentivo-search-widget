## Guests Field in "plus_minus" mode

<!-- STORY -->

Guests field in `plus_minus` mode can be used when you have multiple type of guests and guests types united into different groups

### GuestsField.PlusMinus interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">mode*</td>
        <td valign="top">plus_minus</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Flag that says to widget which field's mode should be used
        </td>
    </tr>
    <tr>
        <td valign="top">placeholder</td>
        <td valign="top">Select guests number</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Visible while input is empty 
        </td>
    </tr>
    <tr>
        <td valign="top">incDecInterval</td>
        <td valign="top">150</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> number
            </code></p>
            Interval of increase and decrease of the guests' number when holding "plus" or "minus" button in the dropdown, 
        </td>
    </tr>
    <tr>
        <td valign="top">data*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;GuestsField.PlusMinus.Data&gt;
            </code></p>
            Object which contains data for rendering a field. See detailed description below
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
<br>

### GuestsField.PlusMinus.Data interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">categoryTitle*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a title of the category in results input
        </td>
    </tr>
    <tr>
            <td valign="top">categoryTitleSingular</td>
            <td valign="top">
                <p><code>
                    <strong>Type:</strong> string
                </code></p>
                Is used as a title of the category in results input when there's only 1 item
            </td>
        </tr>
    <tr>
        <td valign="top">categoryKey*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key when generating the link for redirecting
            <br>(e.g. http://localhost:3000/<b>guests</b>[]:6/adults[]:4/children[]:1/infants[]:1).
        </td>
    </tr>
    <tr>
        <td valign="top">placeholderOrder</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> number
            </code></p>
            Order of the category in results input. By default is 1
        </td>
    </tr>
    <tr>
        <td valign="top">categoryValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;GuestsField.PlusMinus.Data.Item&gt;
            </code></p>
            The list of possible values. See detailed description below
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
<br>

### GuestsField.PlusMinus.Data.Item interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">itemTitle*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is displayed as item's title in dropdown list
        </td>
    </tr>
    <tr>
            <td valign="top">itemTitleSingular</td>
            <td valign="top">
                <p><code>
                    <strong>Type:</strong> string
                </code></p>
                Is displayed as item's title in dropdown list when there's just 1 guest
            </td>
        </tr>
    <tr>
        <td valign="top">itemValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key of current guests' type when generating the link
            <br>(e.g. http://localhost:3000/guests[]:6/<b>adults</b>[]:4/<b>children</b>[]:1/<b>infants</b>[]:1).
        </td>
    </tr>
    <tr>
        <td valign="top">minNumber*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> number
            </code></p>
            Minimum number of guests allowed for current guests' type. Shouldn't be less than 0
        </td>
    </tr>
    <tr>
        <td valign="top">maxNumber*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> number
            </code></p>
            Maximum number of guests allowed for current guests' type 
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
