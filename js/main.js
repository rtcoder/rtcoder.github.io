var GitHubUername = 'rtcoder';

$(document).ready(function () {
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 550);

        event.preventDefault();
    });

    $(window).scroll(function (e) {
        if ($(document).scrollTop() >= 150) {
            $('nav.navbar').addClass('fixed');
        } else {
            $('nav.navbar').removeClass('fixed');
        }
    });

    $('body').scrollspy({
        target: '.navbar-default',
        offset: 51
    });

    $('[data-toggle="tooltip"]').tooltip();

});

var getGitHubUser = function () {
    
}
var getGitHubUserRepos = function () {
    
}