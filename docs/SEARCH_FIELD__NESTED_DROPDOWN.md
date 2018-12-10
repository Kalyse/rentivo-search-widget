## Search Field in "nested_dropdown" mode

<!-- STORY -->

It is an infinity nested dropdown
### SearchField.NestedDropdown interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">mode*</td>
        <td valign="top">nested_dropdown</td>
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
        <td valign="top">menuTitlePrefix</td>
        <td valign="top">All villas in </td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            The string which is prepend to item's name at the title of menu
        </td>
    </tr>
    <tr>
        <td valign="top">data*</td>
        <td valign="top">-</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                SearchField.NestedDropdown.Data
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

### SearchField.NestedDropdown.Data interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">name*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a title for dropdown root menu. If at the field's config is set <code>menuTitlePrefix</code> property, it is prepend to the name 
        </td>
    </tr>
    <tr>
        <td valign="top">pathFragment*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as firs part in pathFragment list, based of which will be generated url
            <br>(e.g http://localhost:3000/<b>search</b>/thailand/koh-samui/2-bedrooms.html?from=2018-09-21&to=2018-09-25)
        </td>
    </tr>
    <tr>
        <td valign="top">children*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;SearchField.NestedDropdown.Data.Item&gt;
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

### SearchField.NestedDropdown.Data.Item interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">name*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a title of item at the current menu, and as a title for submenu (if current item has children). If at the field's config is set <code>menuTitlePrefix</code> property, it is prepend to the name of submenu
        </td>
    </tr>
    <tr>
        <td valign="top">pathFragment*</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a part in pathFragment list, based of which will be generated url
            <br>(e.g http://localhost:3000/search/<b>thailand</b>/koh-samui/2-bedrooms.html?from=2018-09-21&to=2018-09-25)
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
        <td valign="top">children</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong>
                Array&lt;NestedDropdown.Data.Item&gt;
            </code></p>
            The list of possible values. If field is set, it's name becomes a title of submenu.
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
