

//Convert Json Date to JS/JQ Date 
function formatDate(jsonDate) {
    //http://www.c-sharpcorner.com/blogs/convert-json-date-to-javascript-date-in-javascripts1

    var dateAsFromServerSide = jsonDate;
    //alert(dateAsFromServerSide);
    var parsedDate = new Date(parseInt(dateAsFromServerSide.substr(6)));
    //alert(parseInt);

    var jsDate = new Date(parsedDate); // Date object

   // alert(jsDate);

    // format display date (e.g. 04/10/2012)
    var displayDate = convert(jsDate);
    //$.datepicker.formatDate("dd-mm-yyyy", jsDate);

    return displayDate;


}

function convert(str) {

    var today = new Date(str);
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    // var formatted = date + "-" + month + "-" + year;
    var output = year + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + date).length < 2 ? '0' : '') + date;

    return output;
}

