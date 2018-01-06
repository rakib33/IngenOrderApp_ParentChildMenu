/// <reference path="../countrySelect.js" />
/// <reference path="../countrySelect.js" />
var flag = 0;
$(document).ready(function () {

    if (flag == 0) {
        $('#Active').addClass("action-click");
        GetCustomerInfo('Active');
    }
    $("div.btn-group button.btn").click(function () {
        $("div.btn-group").find(".action-click").removeClass("action-click");
        $(this).addClass("action-click");
        flag = 1;
        var id = this.id;
        GetCustomerInfo(id);
    });

    $('.close,.Del').click(function () {
        //alert('hited');
        //Clear all field 
        clearFields();
    });

  
   // $("#LastOrdered").datepicker({ dateFormat: "d-M-yyyy" }).datepicker("setDate", new Date());
    //select country
    //Reference script
    //Content/countrySelect.css and contrySelect.js
    $("#Country").countrySelect();
    $("#Country").countrySelect("selectCountry", "bd"); //select a country
  

});


function CallChangefunc(e) {
    var Flag = 0;
    //First clear all previous data of CustomerModal with any validation error 
    var Id = ''+e;
    if (e.indexOf('-d') >= 0) {
        // Found world
        //alert('contain');
        Flag = 1;
        Id = Id.substring(0,Id.length-2); //remove last two char -d
    }

    //Clear all Field 
    clearFields();
      

    if (e != '' && e != null) {
        //then call ajax to get new data
        try {


                $.ajax({
                    url: '/Customer/GetCustomer',
                    type: "GET",
                    dataType: "JSON",
                    data: { Ref: Id },
                    success: function (data) {
                        // $("#City").html(""); // clear before appending new list

                        if (data.message === "ok") {

                            // var lastOrderDate = JSON.parse(data.model.LastOrdered, dateTimeReviver)
                            try {
                                debugger;
                                if (Flag == 1) { //that mean Delete for DropDown

                                    $('#Ref').val(data.model.Reference);
                                    $('#CustomerDeleteModal').modal('show');

                                } else { //That mean Edit from Dropdown
                                    var lastDate = formatDate(data.model.LastOrdered);
                                    //  alert(lastDate);
                                    $('#Reference').val(data.model.Reference);

                                    $('#Code').val(data.model.Code);
                                    $('#ContactPerson').val(data.model.ContactPerson);

                                    $('#Company').val(data.model.Company);

                                    $('#CountryCode').val(data.model.CountryCode);
                                    $('#Country').val(data.model.Country);

                                    $('#ContactNumber').val(data.model.ContactNumber);

                                    $('#Email').val(data.model.Email);

                                    $('#Website').val(data.model.Website);
                                    $('#Status').val(data.model.Status);

                                    // $('#LastOrdered').val(lastDate);

                                    $("#LastOrdered").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date(lastDate));

                                    $('#AccountType').val(data.model.AccountType);

                                    $('#PaymentType').val(data.model.PaymentType);
                                    $('#Currency').val(data.model.Currency);
                                    $('#AccountCatagory').val(data.model.AccountCatagory);
                                    $('#Industry').val(data.model.Industry);


                                    $('#EditingNotes').val(data.model.EditingNotes);
                                    $('#AdditionalInstructions').val(data.model.AdditionalInstructions);
                                    $('#PreferredFileType').val(data.model.PreferredFileType);
                                    $('#DiscountRate').val(data.model.DiscountRate);


                                    //selected Country
                                    $("#Country").countrySelect("selectCountry", data.model.CountryCode); //select a country

                                    $('#CustomerModal').modal('show');
                                }
                            }
                            catch (err) {
                                alert(err.message);
                            }

                        } else {
                            alert(data.message);
                        }

                    }
                });
         
        }
        catch (err) {
            alert(err.message);
        }
    }
}

//below is bootstrap checkbox link
//https://jsfiddle.net/gyrocode/j5u40azu/

function GetCustomerInfo(option) {
    try {

        var _url = "/Home/LoadData/";
        // alert(_url);

        var t = $('#example').DataTable({
            //for row index
            "columnDefs": [{

                "targets": [0]
            },
            ],

            "pagingType": "full_numbers",
            //for only 2nd column order.ommit this so any column now searcable
            "order": [[1, 'asc']],
            "destroy": true, //must to destroy after load to avoid 'cannot reinitialise datatable' problem
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": false, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "lengthChange": false, //stop filter by 10,15,20,50 row on per page


            "ajax": {
                "url": "/Home/LoadData/",
                "type": "POST",
                "datatype": "json",
                "data": {
                    "status": option
                }
            },


            "columns": [
                       {
                           "data": "Reference", "name": "", "display": "none",
                           render: function (data, type, row, meta) {
                               if (type === 'display') {
                                   //data = '<input type="checkbox" class="editor-active">';
                                   data = '<label class="checkBox"><input id="' + data + '" type="checkbox"><span class="checkmark"></span></label>';

                               }
                               return data;

                           }
                       },   // it is Sr No and data=null I set to prevent display error alert datatables requested unknown parameter '0' for row 0 column 0, also should Display:none
                    { "data": "Code", "name": "Code", "autoWidth": true },
                    { "data": "Country", "name": "Country", "autoWidth": true },

                    { "data": "ContactPerson", "name": "Contact Person", "autoWidth": true },
                    { "data": "ContactNumber", "name": "Contact Number", "autoWidth": true },
                        //
                    {
                        "data": "LastOrdered", "name": "Last Ordered", "autoWidth": true,
                        "render": function (d) {
                            if (d != null)
                                return moment(d).format("DD-MMM-YYYY");
                            else
                                return d;
                        }

                    },
                    { "data": "Email", "name": "Email", "autoWidth": true },
                    {
                        "data": "Status", "name": "Status", "autoWidth": true
                    },

                    {
                        "data": "Reference", "name": "", "display": "none",
                        "render": function (data, type, row, meta) {
                            if (type === 'display') {
                                //style="width:100% !important"
                                data = '<select id="dynamic_select" class="from-control pull-right dt-dropdown" name="dynamic_select" onchange="CallChangefunc(this.value)">\n\<option id="" value="">Select Option</option/>\n\
                                                 <option id="'+ data + '" value="' + data + '">Edit Customer</option/>\n\
                                                 <option id="'+ data + '" value="' + data + '-d">Remove Customer</option/>\n\
                                                  </select>';

                            }
                            return data;
                        }
                    },
            ]
        });
    }
    catch (err) {
        alert(err.message);
    }
}

//replace a global js later
function clearFields() {


    //clear all Error message and style
    $('.field-validation-error').hide();
    $('.input-validation-error').removeClass("input-validation-error");

    //Clear all field data
    $('#Reference').val('');
    $('#Code').val('');
    $('#ContactPerson').val('');
    $('#Company').val('');
    $('#CountryCode').val('');
    $('#Country').val('');
    $('#ContactNumber').val('');
    $('#Email').val('');
    $('#Website').val('');
    $('#Status').val('');
    $('#LastOrdered').val('');   
    $('#AccountType').val('');
    $('#PaymentType').val('');
    $('#Currency').val('');
    $('#AccountCatagory').val('');
    $('#Industry').val('');
    $('#EditingNotes').val('');
    $('#AdditionalInstructions').val('');
    $('#PreferredFileType').val('');
    $('#DiscountRate').val('');


    $("#LastOrdered").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());

    //Destroy all country
    $("#Country").countrySelect("destroy");
    //Reassign Country
    $("#Country").countrySelect();
    $("#Country").countrySelect("selectCountry", "bd"); //select a country

}

