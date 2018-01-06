/// <reference path="../../angular.js" />
/// <reference path="../Module.js" />

app.controller('homeCtrl', ['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder',
    function ($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
        $scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn("Name", "Name").withOption('name', 'Name'),
            DTColumnBuilder.newColumn("Description", "Description").withOption('name', 'Description'),
            DTColumnBuilder.newColumn("ContactName", "Contact Name").withOption('name', 'ContactName'),
            DTColumnBuilder.newColumn("AdditionalRate", "AdditionalRate").withOption('name', 'AdditionalRate'),
            DTColumnBuilder.newColumn("Hours", "Hours").withOption('name', 'Hours')
        ]

        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
            dataSrc: "data",
            url: "/OrderDeliveries/LoadOrdeDeliveryData/",
            type: "POST",
            datatype: "json",
            data: {
                "status": option
            }
        })
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength(10) // Page size
        .withOption('aaSorting', [0, 'asc']) // for default sorting column // here 0 means first column
        .withOption('order',[1, 'asc'])
        .withOption('destroy', true)   //must to destroy after load to avoid 'cannot reinitialise datatable' problem
        .withOption('filter', false)   // this is for disable filter (search box)
                
    }])