/// <reference path="../angular.js" />
var app;
(function () {
    app = angular.module("bookStoreApp", ['ngResource','angularUtils.directives.dirPagination', 'ngRoute', 'ngFileUpload']);
})();

var baseAddress = 'http://localhost:55170/';

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      //   route for the home page
        .when('/', {
            templateUrl: 'Pages/Author.html',
            controller: 'AuthorController'
        })

        // route for the about page
        .when('/Author', {
            templateUrl: 'Pages/Author.html',
            controller: 'AuthorController'
        })
        // route for the Book page
        .when('/Book', {
            templateUrl: 'Pages/Book.html',
            controller: 'BookController'
        })
       .when('/Employee', {
           templateUrl: 'Pages/Employee/test.html',
           controller: 'EployeeController'
       })
        .otherwise({ redirectTo: '/' });
}]);

//global veriable for store service base path
app.constant('serviceBasePath', 'http://localhost:55170/');