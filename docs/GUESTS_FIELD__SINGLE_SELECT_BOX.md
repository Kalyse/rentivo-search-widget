## Guests Field in "single_select_box" mode

<!-- STORY -->

In `single_select_box` mode widget's guests field works like first example on [Select2 documentation page](https://select2.org/getting-started/basic-usage#single-select-boxes)

### GuestsField.SingleSelectBox interface

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
        <td valign="top">initialValue</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Should match with property <code>itemValue</code> of one of the items defined in the <code>data</code>. By default is used value of the first element in item's array 
        </td>
    </tr>
    <tr>
        <td valign="top">data*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                GuestsField.SingleSelectBox.Data
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

### GuestsField.SingleSelectBox.Data interface

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
            Is used as a key when generating the link for redirecting 
            <br>(e.g. http://localhost:3000/location[]:TU/<b>sleeps</b>:3).
        </td>
    </tr>
    <tr>
        <td valign="top">categoryValue*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;GuestsField.SingleSelectBox.Data.Item&gt;
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

### GuestsField.SingleSelectBox.Data.Item interface

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
            <br>(e.g. http://localhost:3000/location[]:TU/sleeps:<b>3</b>).
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
