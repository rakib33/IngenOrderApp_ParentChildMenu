/// <reference path="../angular.js" />

var app = angular.module('MyApp', ['datatables']);

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
            url: "/OrderDeliveries/LoadOrdeDeliveryData",
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
        .withOption('order', [1, 'asc'])
        .withOption('destroy', true)   //must to destroy after load to avoid 'cannot reinitialise datatable' problem
        .withOption('filter', false)   // this is for disable filter (search box)

    }])


//app.controller('homeCtrl', ['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder',
//    function ($scope, $http, DTOptionsBuilder, DTColumnBuilder) {
//        $scope.dtColumns = [
//            //here We will add .withOption('name','column_name') for send column name to the server 
//            DTColumnBuilder.newColumn("CustomerID", "Customer ID").withOption('name', 'CustomerID'),
//            DTColumnBuilder.newColumn("CompanyName", "Company Name").withOption('name', 'CompanyName'),
//            DTColumnBuilder.newColumn("ContactName", "Contact Name").withOption('name', 'ContactName'),
//            DTColumnBuilder.newColumn("Phone", "Phone").withOption('name', 'Phone'),
//            DTColumnBuilder.newColumn("City", "City").withOption('name', 'City'),
//            DTColumnBuilder.newColumn("Date", "Date").renderWith(function (data,type,full) {
                
//                return moment(data).format("DD-MMM-YYYY");  //Do MMM YYYY =>11th Sep 02017
               
//            })
//        ]

//        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
//            dataSrc: "data",
//            url: "/home/getdata",
//            type:"POST"
//        })
//        .withOption('processing', true) //for show progress bar
//        .withOption('serverSide', true) // for server side processing
//        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
//        .withDisplayLength(10) // Page size
//        .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
//    }])