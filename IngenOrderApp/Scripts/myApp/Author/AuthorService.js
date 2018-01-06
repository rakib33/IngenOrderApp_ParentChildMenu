/// <reference path="../../angular.js" />
/// <reference path="../module.js" />
app.service('AuthorService', function ($http) {

    var urlBase = '/api/customers';
    var baseAddress = 'http://localhost:55170/';
    var url = "";

    this.getAuthorsList = function () {

        //alert('get Author List from Service.');
        url = baseAddress + "author/list";
        return $http.get(url);
    };

    this.getAuthor = function (author) {
        url = baseAddress + "author/getAuthor/" + author.Id;
        return $http.get(url);
    };

    this.addAuthor = function (author) {
        url = baseAddress + "author/post";
        return $http.post(url, author);
    };
    this.deleteAuthor = function (author) {
        url = baseAddress + "DeleteAuthor/" + author.Id;
        return $http.delete(url);
    };

    this.updateAuthor = function (author) {
        url = baseAddress + "author/Update/" + author.Id;
        return $http.put(url, author);
    };



    ////Create new record
    //this.post = function (Employee) {
    //    var request = $http({
    //        method: "post",
    //        url: "/api/EmployeesAPI",
    //        data: Employee
    //    });
    //    return request;
    //}
    ////Get Single Records
    //this.get = function (EmpNo) {
    //    return $http.get("/api/EmployeesAPI/" + EmpNo);
    //}

    ////Get All Employees
    //this.getEmployees = function () {
    //    return $http.get("/api/EmployeesAPI");
    //}


    ////Update the Record
    //this.put = function (EmpNo, Employee) {
    //    var request = $http({
    //        method: "put",
    //        url: "/api/EmployeesAPI/" + EmpNo,
    //        data: Employee
    //    });
    //    return request;
    //}
    ////Delete the Record
    //this.delete = function (EmpNo) {
    //    var request = $http({
    //        method: "delete",
    //        url: "/api/EmployeesAPI/" + EmpNo
    //    });
    //    return request;
    //}

});