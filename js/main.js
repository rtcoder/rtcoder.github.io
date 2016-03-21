$(document).ready(function () {
    $("#left-panel nav li").click(function () {
        $("#left-panel nav li").removeClass("current")
        $(this).addClass("current")
        switch ($(this).attr("id")) {
            case "all":
                $(".project").show()
            break;
            case "games":
                $(".project").show().not(".game").hide()
            break;
            case "apps":
                $(".project").show().not(".application").hide()
            break;
            default: return false;

        }
    })
})
