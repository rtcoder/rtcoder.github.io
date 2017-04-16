var GitHubUername = 'rtcoder';
var repos = null;
var getGitHubUser = function () {
    $.get('https://api.github.com/users/' + GitHubUername, function (data) {
        return data;
    });
};
var getGitHubUserRepos = function () {
    $.get('https://api.github.com/users/' + GitHubUername + '/repos', function (data) {
        repos = data;
        $('.projects-list').find('i').remove();
        for (i in repos) {
            var icon = '<div class="col-xs-1"><i class="fa fa-github fa-2x"></i></div>';
            var name = '<div class="col-xs-11"></div>';
            $('.projects-list').append('<div class="col-xs-12 project">' + icon + '</div>')
        }
    });
};
getGitHubUserRepos();

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