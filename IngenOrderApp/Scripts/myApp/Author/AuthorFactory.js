//A factory is responsible for creating and returning an object that can be 
//used to work with data, validate business rules,or perform a variety of other tasks.
//Angular factories are singletons by default so the object returned by a factory is re-used by the application.
//Here’s an example of a factory that handles GET, PUT, POST, and DELETE calls to the ASP.NET Web API service. 
//The factory creates an object that handles making calls to the server.


angular.module('bookStoreApp').factory('AuthorStoreFactory', ['$http', function ($http) {

        var baseAddress = 'http://localhost:55170/';
       // var urlBase = '/api/customers';
        var AuthorStoreFactory = {};
        var url = "";
        AuthorStoreFactory.getAuthorsList = function(){
            url = baseAddress + "author/list";
            return $http.get(url);
        };
        AuthorStoreFactory.getAuthor = function (author) {
            url = baseAddress + "author/getAuthor/" + author.Id;
            return $http.get(url);
        };
        AuthorStoreFactory.addAuthor = function (author) {
            url = baseAddress + "author/post";
            return $http.post(url, author);
        };
        AuthorStoreFactory.deleteAuthor = function (author) {
            url = baseAddress + "DeleteAuthor/" + author.Id;
            return $http.delete(url);
        };
        AuthorStoreFactory.updateAuthor = function (author) {
            url = baseAddress + "author/Update/" + author.Id;
            return $http.put(url, author);
        };
       
        return AuthorStoreFactory;
        //dataFactory.getCustomers = function () {
        //    return $http.get(urlBase);
        //};

        //dataFactory.getCustomer = function (id) {
        //    return $http.get(urlBase + '/' + id);
        //};

        //dataFactory.insertCustomer = function (cust) {
        //    return $http.post(urlBase, cust);
        //};

        //dataFactory.updateCustomer = function (cust) {
        //    return $http.put(urlBase + '/' + cust.ID, cust)
        //};

        //dataFactory.deleteCustomer = function (id) {
        //    return $http.delete(urlBase + '/' + id);
        //};

        //dataFactory.getOrders = function (id) {
        //    return $http.get(urlBase + '/' + id + '/orders');
        //};

        //return dataFactory;
    }]);

//app.factory('AuthorStoreFactory', function ($http) {
//    return {
//        getAuthorsList: function () {
//            url = baseAddress + "author/list";
//            return $http.get(url);
//        },
//        getAuthor: function (author) {
//            url = baseAddress + "author/getAuthor/" + author.Id;
//            return $http.get(url);
//        },
//        addAuthor: function (author) {
//            url = baseAddress + "author/post";
//            return $http.post(url, author);
//        },
//        deleteAuthor: function (author) {
//            url = baseAddress + "DeleteAuthor/" + author.Id;
//            return $http.delete(url);
//        },
//        updateAuthor: function (author) {
//            url = baseAddress + "author/Update/" + author.Id;
//            return $http.put(url, author);
//        }
//    };
//});