/// <reference path="../../angular.js" />
/// <reference path="../module.js" />

app.controller('BookController', function ($scope, $http, $timeout, $compile, Upload, BookService) {
    // $scope.message = 'This is a book Controller.';

    $scope.books = [];
    $scope.book = null;

    //below is responsible to display selected Image
    $scope.onChange = function (files) {
        if (files[0] == undefined) return;
        $scope.fileExt = files[0].name.split(".").pop()
    }
    $scope.isImage = function (ext) {
        if (ext) {
            return ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "JPG"
        }
    }
    //End display selected Image

    $scope.isLoading = false;
    $scope.editMode = false;

    //get User display author when row click
    $scope.get = function () {
        $scope.book = this.book;
        $scope.editMode = true;
        $scope.editText = true;

        console.log('table row click');
        $('#BookSaveModel').modal('show');
        //$('#bookViewModal').modal('show');
    };

    //get all Author
    $scope.getAll = function () {
        console.log('This is comes from Book Service');
        alert('This is comes from Book Service');
        //Display Loading Bar
        $scope.isLoading = true;
        $scope.showBook = false; // Don't display untill data completly load

        BookService.getBooksList().success(function (data) {
            console.log(data.list);
            if (data.message == "ok") {
                $scope.books = data.list;
            } else {
                $scope.error = data.message;
            }

        }).error(function (data) {
            $scope.error = "An Error has occured while Loading users! " + data.ExceptionMessage;
        });

        $scope.isLoading = false;
        $scope.showBook = true;
        //add for pagination
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
    };

    // add Author
    $scope.add = function () {
        var currentBook = this.book;
        if (currentBook != null && currentBook.Title != null && currentBook.ISBN && currentBook.PublishingDate && currentBook.Price && currentBook.PublishingHouse) {
            BookService.addBook(currentBook).success(function (data) {

                $scope.addMode = false; // 
                $scope.editText = false;
                currentBook.Id = data.id;

                console.log(data.message);

                if (data.message == "ok")
                    $scope.books.push(currentBook);
                else
                    $scope.error = data.message;
                //reset form
                $scope.book = null;

                $('#BookSaveModel').modal('hide');
            }).error(function (data) {
                $('#BookSaveModel').modal('hide');
                $scope.error = "An Error has occured while Adding user! " + data.ExceptionMessage;

            });
        }
        else {
            $scope.error = "Invalid Provided data.";
            $('#BookSaveModel').modal('hide');
        }
    };

    //edit Book
    $scope.edit = function () {

        $scope.book = this.book;
        //add by rakibul 10-05-17
        console.log('Edit mode=true editText readonly true');
        $scope.editMode = true;
        $scope.editText = true;
        //
        $('#BookSaveModel').modal('show');
    };

    //update Book
    $scope.update = function () {
        var currentBook = this.book;
        BookService.updateBook(currentBook).success(function (data) {
            currentBook.editMode = false;

            if (data.message != "ok")
                $scope.error = data.message;

        }).error(function (data) {
            $scope.error = "An Error has occured while Updating user! " + data.ExceptionMessage;
        });

        $('#BookSaveModel').modal('hide');
    };

    // delete Book
    $scope.delete = function () {
        currentBook = $scope.book;
        BookService.deleteUser(currentBook).success(function (data) {
            $('#confirmModal').modal('hide');
            $scope.books.pop(currentBook);

        }).error(function (data) {
            $scope.error = "An Error has occured while Deleting book! " + data.ExceptionMessage;
            $('#confirmModal').modal('hide');
        });
    };

    //Model popup events
    $scope.showadd = function () {
        console.log('show add click');
        $scope.book = null;
        $scope.editMode = false;
        $scope.editText = false; //all textbox readonly=false add by rakibul 10-5-17
        $('#BookSaveModel').modal('show');
    };

    $scope.showedit = function () {
        //add by rakibul 10-05-17
        console.log('show edit click');
        $scope.editMode = true;
        $scope.editText = true;
        //
        $('#BookSaveModel').modal('show');
    };

    $scope.showconfirm = function (data) {
        $scope.book = data;
        $('#confirmModal').modal('show');
    };

    $scope.cancel = function () {
        $scope.book = null;
        $('#BookSaveModel').modal('hide');
    }

    // initialize your users data 
    $scope.getAll();

    this.myDate = new Date();

    this.minDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth() - 2,
      this.myDate.getDate()
    );

    this.maxDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth() + 2,
      this.myDate.getDate()
    );

    this.onlyWeekendsPredicate = function (date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    };
});