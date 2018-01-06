//https://stackoverflow.com/questions/2988025/menu-with-hover-click-class-change-and-ajax
//https://joomla.stackexchange.com/questions/101/ajax-call-to-component-from-menu-item

$(function () {
    //https://formden.com/blog/date-picker

    //$('.datepicker').datepicker({
    //    format: 'd-M-yyyy'
    //})

    $(".datepicker").datepicker({
        format: 'd-M-yy',
        orientation: 'bottom right',      
        todayHighlight: true,
        autoclose: true,
        maxDate: '0'
    }).val("setDate", new Date()); //dateFormat: 'd-M-yy'

    //$("#menu").find("a").hover(function () {
    //    var id = this.id;
    //    //  alert(id);
    //    $(this).addClass("menuLink");
    //}, function () {
    //    $(this).not(".clicking").not(".selected").removeClass("menuLink");
    //});

    $("#menu").find("a").click(function () {
        var id = ''+this.id; //make it a string
        var href = $(this).attr('href'); //get the href value

        var splitId = id.split('/');

       // alert('controller ' + splitId[0] + ' Action :' + splitId[1]);

        if (splitId[1] != 'LogOff') {
            event.preventDefault(); //prevent the link event if it is not LogOff
        }
        //now call Ajax to replace new html in Replace Div

        var link = '';
       
        if (splitId[1] === 'undefined')
        {
            link =''+ splitId[1];
            event.preventDefault(); //prevent the link event if it is not LogOff
            alert(link);
        }
        else if (link != 'undefined' || link != '' || link != null) {
            alert(splitId[1]);
            link = '/' + id;
            $.ajax({

                url: link,
                contentType: 'application/html; charset=utf-8',
                type: 'GET',
                dataType: 'html',
                data: { fromAjax: 'FromAjax' }

            }).success(function (result) {
                $('#Replace').empty(); //empty previous html
                $('#Replace').html(result);
                link = '';
            })
            .error(function (xhr, status) {
                alert(status);
                link = '';
            })
            ;

        }
        else {
            //nothing
        }
        //var $this = $(this);
        //$("#ajaxP").fadeIn("fast");
        //$("#normalcontent").hide("fast").load($this.attr("href") + " #normalcontent", "", function () {
        //    $("#normalcontent").slideDown("slow");
        //});
        //$("#primarycontainer").hide("fast").load($this.attr("href") + " #primarycontainer", "", function () {
        //    $("#primarycontainer").slideDown("slow");
        //    $("#ajaxP").fadeOut("fast");
        //})
        //$this.closest('ul').find('a').removeClass('active clicking selected');
        //$this.addClass('active clicking selected');
        //return false;
    });
});