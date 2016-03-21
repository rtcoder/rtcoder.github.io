$(document).ready(function () {
    $("#left-panel nav li").click(function () {
        $("#left-panel nav li").removeClass("current")
        $(this).addClass("current")

        var title;

        switch ($(this).attr("id")) {
            case "all":
                title = "All projects";
                $(".project").show()
            break;
            case "games":
                title = "Games";
                $(".project").show().not(".game").hide()
            break;
            case "apps":
                title = "Apps";
                $(".project").show().not(".application").hide()
            break;
            default: return false;
        }
        $("h2").text(title);
    })
})
