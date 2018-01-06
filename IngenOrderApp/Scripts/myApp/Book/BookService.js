/// <reference path="../../angular.js" />
/// <reference path="../module.js" />

app.service('BookService', function ($http) {

   
   // var baseAddress = 'http://localhost:55170/';
    var url = "";
   this.getBooksList = function () {
        url =  baseAddress + "book/list";
        return $http.get(url);
    };
   this.getBook = function (book) {
       url = baseAddress + "book/getbook/" + book.Id;
       return $http.get(url);
   };
   this.addBook = function (book) {
       url = baseAddress + "book/post";
       return $http.post(url, book);
   };
   this.deleteBook = function (book) {
       url = baseAddress + "DeleteBook/" + book.Id;
       return $http.delete(url);
   };
   this.updateBook = function (book) {
        url = baseAddress + "book/Update/" + book.Id;
        return $http.put(url, book);
    }

});

//angular.module('app').factory('BookStoreFactory', function ($http) {
//    return {
//        getBooksList: function () {
//            url = baseAddress + "book/list";
//            return $http.get(url);
//        },
//        getBook: function (book) {
//            url = baseAddress + "book/getbook/" + book.Id;
//            return $http.get(url);
//        },
//        addBook: function (book) {
//            url = baseAddress + "book/post";
//            return $http.post(url, book);
//        },
//        deleteBook: function (book) {
//            url = baseAddress + "DeleteBook/" + book.Id;
//            return $http.delete(url);
//        },
//        updateBook: function (book) {
//            url = baseAddress + "book/Update/" + book.Id;
//            return $http.put(url, book);
//        }
//    };
//});