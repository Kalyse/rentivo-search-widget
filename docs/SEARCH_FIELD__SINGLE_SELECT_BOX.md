## Search Field in "single_select_box" mode

<!-- STORY -->

In `single_select_box` mode widget's search field works like first example on [Select2 documentation page](https://select2.org/getting-started/basic-usage#single-select-boxes)
### SearchField.SingleSelectBox interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">mode*</td>
        <td valign="top">single_select_box</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Flag that says to widget which field's mode should be used
        </td>
    </tr>
    <tr>
        <td valign="top">placeholder</td>
        <td valign="top">Where do you want to go?</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Visible while input is empty
        </td>
    </tr>
    <tr>
        <td valign="top">data*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                SearchField.SingleSelectBox.Data
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

### SearchField.SingleSelectBox.Data interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">categoryKey*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key when generating the link for redirecting (e.g. http://localhost:3000/<b>location[]</b>:TU).
        </td>
    </tr>
    <tr>
        <td valign="top">categoryValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;SearchField.SingleSelectBox.Data.Item&gt;
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

### SearchField.SingleSelectBox.Data.Item interface

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
        <td valign="top">itemValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as value when generating the link
            <br>(e.g. http://localhost:3000/location[]:<b>TU</b>)
        </td>
    </tr>
    <tr>
        <td valign="top">WOEID</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as prefix for generated part of url
            <br>(e.g. http://localhost:3000/<b>7153345</b>/location[]:TU).
        </td>
    </tr>
    <tr>
        <td valign="top">customWidgetConfig</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> СustomWidgetConfig
            </code></p>
            Is used for customisation of global widget's config for certain dropdown item. For more details see the story "Widget config" 
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>