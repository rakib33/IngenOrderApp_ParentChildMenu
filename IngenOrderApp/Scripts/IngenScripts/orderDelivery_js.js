
$(document).ready(function () {
    
    GetOrderDeliveryInfo('Active');
  
});

function GetOrderDeliveryInfo(option) {
    try {

     
        var _url = "/OrderDeliveries/LoadOrdeDeliveryData/";
        // alert(_url);

        var t = $('#tbl_ordeDelivery').DataTable({
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
                "url": _url,
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
                    { "data": "Name", "name": "Name", "autoWidth": true },
                    { "data": "Description", "name": "Description", "autoWidth": true },

                    { "data": "AdditionalRate", "name": "Additional Rate", "autoWidth": true },
                    { "data": "Hours", "name": "Hours", "autoWidth": true },
                      
                    {
                        "data": "Reference", "name": "", "display": "none",
                        "render": function (data, type, row, meta) {
                            if (type === 'display') {
                                //style="width:100% !important"
                                data = '<select id="dynamic_select" class="from-control pull-right dt-dropdown" name="dynamic_select" onchange="CallChangefunc(this.value)">\n\<option id="" value="">Select Option</option/>\n\
                                                 <option id="'+ data + '" value="' + data + '">Edit Order</option/>\n\
                                                 <option id="'+ data + '" value="' + data + '-d">Remove Order</option/>\n\
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