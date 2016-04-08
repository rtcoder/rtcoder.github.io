$(document).ready(function () {
    var is_mobile = false;
    if (/mobile/i.test(navigator.userAgent)) {
        is_mobile = true;
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/mobile.css') );
    }

    $("#left-panel nav li").click(function () {
        $("#left-panel nav li").removeClass("current");
        $(this).addClass("current");

        var title = $(this).attr('title');

        switch ($(this).attr("id")) {
            case "all":
                $(".project").show();
            break;
            case "games":
                $(".project").show().not(".game").hide();
            break;
            case "apps":
                $(".project").show().not(".application").hide();
            break;
            case "plugins":
                $(".project").show().not(".plugin").hide();
            break;
            case "tools":
                $(".project").show().not(".tool").hide();
            break;
            case "codepen":
                $(".project").show().not(".codepen").hide();
            break;
            default: return false;
        }
        if($(".project:visible").length == 0){
            $("#noprojects").show();
        }else {
            $("#noprojects").hide();
        }
        if(is_mobile)
            $("#left-panel").removeClass("expanded")
        $("h2").text(title);
    });

    $("#menu-button").click(function () {
        $("#left-panel").toggleClass("expanded")
    })
});
