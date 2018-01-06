/// <reference path="../../angular.js" />
/// <reference path="../module.js" />

//The controller is having 'AuthorService' dependency.
//This controller makes call to methods from the service 
app.controller('AuthorController', function PostController($scope, $http, AuthorService) {  //i add $http, for paging

    $scope.isLoading = false;

    $scope.authors = [];
    $scope.author = {};   //null;
    $scope.editMode = false;
    $scope.authorSave = {};

    var Index;

    //get User display author when row click
    $scope.get = function () {
        console.log('get call from grid row double click');
        $scope.authorSave = {}; //because when ShowAdd we assign it null and nulable object can not assign any data so here 
        //we need to assign data and vreate array object
        Index = this.$index;
        alert(Index);
        //$scope.author = this.authorList;          

        //Author Initialization so that list data doesn't change while editing
        $scope.authorSave = {};
        $scope.authorSave.Init = this.authorList.Initials;
        $scope.authorSave.FName = this.authorList.FirstName;
        $scope.authorSave.LName = this.authorList.LastName;
        $scope.authorSave.Id = this.authorList.Id;
        $scope.authorSave.address = this.authorList.Address;
        $scope.authorSave.Zip_Code = this.authorList.ZipCode;
        $scope.authorSave.CountryName = this.authorList.Country;

        console.log($scope.authorSave);


        $scope.editMode = true;
        $scope.editText = true;
        //alert($scope.author.Id);
        console.log('table row click');
        $('#AuthorSaveModel').modal('show');
        //$('#AuthorViewModal').modal('show');
    };

    //get all Author
    $scope.getAll = function () {
        console.log('call data list');
        $scope.showAuthor = false; //don't display Author.html page until data load complete

        $scope.showLoader = true; //Display loader
       
        AuthorService.getAuthorsList().success(function (data) {

            console.log(data.list);
            $scope.authors = data.list;
           // alert('Author assigned!');       
            $scope.showLoader = false;
            $scope.showAuthor = true; //display the Author.html page 

        }).error(function (data) {

            $scope.showLoader = false;
            $scope.error = "An Error has occured while Loading users! " + data.ExceptionMessage;
            $scope.showAuthor = true; //display the Author.html page 
        });


        //add for pagination
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

       
    };

    // add Author
    $scope.add = function () {

        $scope.author = {};

        $scope.author.Initials = this.authorSave.Init;
        $scope.author.FirstName = this.authorSave.FName;
        $scope.author.LastName = this.authorSave.LName;
        $scope.author.ZipCode = this.authorSave.Zip_Code;
        $scope.author.Address = this.authorSave.address;
        $scope.author.Country = this.authorSave.CountryName;
        $scope.author.Id = this.authorSave.Id;

        var currentAuthor = this.author;

        console.log('author to save');



        console.log(currentAuthor);
        // this.author;
        if (currentAuthor != null && currentAuthor.FirstName != null && currentAuthor.Address && currentAuthor.LastName && currentAuthor.ZipCode && currentAuthor.Country && currentAuthor.Initials) {
            AuthorService.addAuthor(currentAuthor).success(function (data) {

                $scope.addMode = false; // 
                $scope.editText = false;
                currentAuthor.Id = data.id;

                console.log(data.message);

                if (data.message == "ok")
                    $scope.authors.push(currentAuthor);
                else
                    $scope.error = data.message;
                //reset form
                $scope.author = null;
                $scope.authorSave = null;
                // $scope.AddAuthorForm.$setPristine(); //for form reset

                $('#AuthorSaveModel').modal('hide');
            }).error(function (data) {
                $scope.error = "An Error has occured while Adding user! " + data.ExceptionMessage;
                $('#AuthorSaveModel').modal('hide');
            });
        }
    };

    //edit Author
    $scope.edit = function () {

        $scope.author = this.author;
        //add by rakibul 1-05-17
        console.log('Edit mode=true editText readonly true');
        $scope.editMode = true;
        $scope.editText = true;
        //
        $('#AuthorSaveModel').modal('show');
    };

    //update Author
    $scope.update = function () {


        console.log('update hited');

        $scope.author.Initials = this.authorSave.Init;
        $scope.author.FirstName = this.authorSave.FName;
        $scope.author.LastName = this.authorSave.LName;
        $scope.author.ZipCode = this.authorSave.Zip_Code;
        $scope.author.Address = this.authorSave.address;
        $scope.author.Country = this.authorSave.CountryName;
        $scope.author.Id = this.authorSave.Id;

        console.log($scope.author);

        var currentAuthor = $scope.author;  // this.authorSave;    //this.author;

        //console.log(currentAuthor);

        AuthorService.updateAuthor(currentAuthor).success(function (data) {
            currentAuthor.editMode = false;
            $('#AuthorSaveModel').modal('hide');

            if (data.message == "ok") {


                $scope.getAll();

                // $scope.authors.pop(currentAuthor);
                // $scope.authors.push(currentAuthor);
            }
            else {
                $scope.error = data.message;
            }

        }).error(function (data) {
            $scope.error = "An Error has occured while Updating user! " + data.ExceptionMessage;
            $('#AuthorSaveModel').modal('hide');
        });
    };

    // delete Author
    $scope.delete = function () {
        currentAuthor = $scope.author;
        AuthorService.deleteAuthor(currentAuthor).success(function (data) {
            $('#confirmModal').modal('hide');
            $scope.authors.pop(currentAuthor);

        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting user! " + data.ExceptionMessage;

            $('#confirmModal').modal('hide');
        });
    };

    //Model popup events
    $scope.showadd = function () {
        console.log('show add click');
        $scope.author = null;
        $scope.authorSave = null;
        $scope.editMode = false;
        $scope.editText = false; //all textbox readonly=false add by rakibul 1-5-17
        $('#AuthorSaveModel').modal('show');
    };

    $scope.showedit = function () {
        //add by rakibul 1-05-17
        console.log('show edit click');
        $scope.editMode = true;
        $scope.editText = true;
        //
        $('#AuthorSaveModel').modal('show');
    };

    $scope.showconfirm = function (data) {
        $scope.author = data;
        $('#confirmModal').modal('show');
    };

    $scope.cancel = function () {
        $scope.author = null;
        $('#AuthorSaveModel').modal('hide');
    }


    $scope.init = function () {
        // initialize your users data 
        $scope.getAll();
    };
    //// initialize your users data 
    //$scope.getAll();

});



