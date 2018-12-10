## Dates Fields

<!-- STORY -->

These are fields for choosing a range of dates. Its based on [react-dates widget](https://github.com/airbnb/react-dates/) provided by Airbnb team

### DatesFields interface

<table>
    <tr>
        <th align="left">Property</th>
        <th align="left">Default</th>
        <th align="left">Description</th>
    </tr>
    <tr>
        <td valign="top">startDateId</td>
        <td valign="top">checkIn</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key when generating the link for redirecting
            <br>(e.g. http://localhost:3000/<b>checkIn</b>:2018-12-12/checkOut:2018-12-13/sleeps[]:1).
        </td>
    </tr>
    <tr>
        <td valign="top">endDateId</td>
        <td valign="top">checkOut</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Is used as a key when generating the link for redirecting
            <br>(e.g. http://localhost:3000/checkIn:2018-12-12/<b>checkOut</b>:2018-12-13/sleeps[]:1).
        </td>
    </tr>
    <tr>
        <td valign="top">startDatePlaceholderText</td>
        <td valign="top">Start Date</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Visible while input is empty
        </td>
    </tr>
    <tr>
        <td valign="top">endDatePlaceholderText</td>
        <td valign="top">End Date</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Visible while input is empty
        </td>
    </tr>
    <tr>
        <td valign="top">inputDateFormat*</td>
        <td valign="top">DD/MM/YYYY</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Date format to display in the dates inputs
        </td>
    </tr>
    <tr>
        <td valign="top">urlDateFormat*</td>
        <td valign="top">YYYY-MM-DD</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> string
            </code></p>
            Date format to display as checkIn and chekOut values in the generated url
            <br>(e.g. http://localhost:3000/checkIn:<b>2018-12-12</b>/checkOut:<b>2018-12-13</b>/sleeps[]:1).
        </td>
    </tr>
    <tr>
        <td valign="top">appendToBody*</td>
        <td valign="top">false</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> boolean
            </code></p>
            Flag impact on whether datepicker markup will be appended to the <code>&lt;body/&gt;</code> tag or to the same with dates inputs markup level
        </td>
    </tr>
    <tr>
        <td valign="top">numberOfMonths*</td>
        <td valign="top">2</td>
        <td valign="top">
            <p><code>
                <strong>Type:</strong> number
            </code></p>
            Initial number of calendars at the datepicker. Notice that if size of widget's container is less than 620px - numberOfMonth value changes to 1 automatically
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <b><small>Properties with asterisk (*) are required</small></b>
        </td>
    </tr>
</table>
<br>