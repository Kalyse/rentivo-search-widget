## Search Field in "multi_select_box" mode

<!-- STORY -->

In `MultiSelectBox` mode widget's search field works like [pillbox](https://select2.org/getting-started/basic-usage#multi-select-boxes-pillbox) example.

### SearchField.MultiSelectBox interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">mode*</td>
        <td valign="top">multi_select_box</td>
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
                Array&lt;SearchField.MultiSelectBox.Data&gt;
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

### SearchField.MultiSelectBox.Data interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">singleResult*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> boolean
            </code></p>
            If true - it's possible to choose only one item in group
        </td>
    </tr>
    <tr>
        <td valign="top">categoryTitle*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Separate groups in dwopdown list
        </td>
    </tr>
    <tr>
        <td valign="top">categoryKey*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key when generating the link for redirecting
            <br>(e.g. http://localhost:3000/<b>location[]</b>:TU).
        </td>
    </tr>
    <tr>
        <td valign="top">categoryValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;SearchField.MultiSelectBox.Data.Item&gt;
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

### SearchField.MultiSelectBox.Data.Item interface

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
            Is used as value when generating the link (e.g. http://localhost:3000/location[]:<b>TU</b>)
        </td>
    </tr>
    <tr>
        <td valign="top">WOEID</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            <p><strong>Only for categories with <code>"singleResult": true</strong></code></p>
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