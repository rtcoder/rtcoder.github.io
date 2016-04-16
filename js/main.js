$(document).ready(function () {
    var is_mobile = false;
    if (/mobile/i.test(navigator.userAgent)) {
        is_mobile = true;
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/mobile.css') );
    }

    if(is_mobile){
        $("span.text").css({
            "margin-left" : - ($(window).width()/2 - $('#left-panel').width()) + 100
        })
    }


    vmousemove = false;
    $(document).on('touchstart', function(e){
        if(e.originalEvent.touches[0].pageX > $(window).width()/2)
            $('#left-panel').width(100).removeClass('expanded')



        if($('#left-panel').hasClass("expanded")){
            if(e.originalEvent.touches[0].pageX < $(window).width()/2 && e.originalEvent.touches[0].pageX >= $(window).width()/2 - 50){
                vmousemove = true;
            }
        }else{
            if(e.originalEvent.touches[0].pageX < 100){
                vmousemove = true;
            }
        }
    }).on('touchend', function(e){
        vmousemove = false;
        if($('#left-panel').width() >= ($(window).width()/4)){
            $('#left-panel').width($(window).width()/2).addClass("expanded");
        }
        if ($('#left-panel').width() < ($(window).width()/4)) {
            $('#left-panel').width(100).removeClass('expanded')
        }
    }).on("vmousemove", function (e) {
        // console.log(e.pageX);
        if (vmousemove) {
            e.preventDefault();
            var w = (e.pageX <= $(window).width()/2) ? e.pageX : $(window).width()/2;
            if(w<100) w = 100;
            console.log(w);
            $('#left-panel').width(w);
            $("span.text").css({
                "margin-left" : - ($(window).width()/2 - $('#left-panel').width()) + 100
            })
        }
    })





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
