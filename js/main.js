var GitHubUername = 'rtcoder';
var repos = null;
var blacklist = ['rtcoder.github.io', 'etnel', 'js-os', 'WebWriter', 'phybel_strona', 'game', 'SocialZone'];
var langColors = {
    JavaScript: '#f1e05a',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    Batchfile: '#C1F12E',
    PowerShell: '#012456',
    ApacheConf: ''
};
var skillsList = [
    {title: "HTML5", classname: "devicon-html5-plain"},
    {title: "CSS3", classname: "devicon-css3-plain"},
    {title: "LESS", classname: "devicon-less-plain-wordmark"},
    {title: "Bootstrap", classname: "devicon-bootstrap-plain"},
    {title: "Javascript", classname: "devicon-javascript-plain"},
    {title: "jQuery", classname: "devicon-jquery-plain-wordmark"},
    {title: "PHP", classname: "devicon-php-plain"},
    {title: "Zend Framework", classname: "devicon-zend-plain"},
    {title: "Laravel", classname: "devicon-laravel-plain"},
    {title: "MySQL", classname: "devicon-mysql-plain-wordmark"},
    {title: "Git", classname: "devicon-git-plain"}
];
var getGitHubUser = function () {
    $.get('https://api.github.com/users/' + GitHubUername, function (data) {
        $('#home .image').html('<img class="img-responsive" src="' + data.avatar_url + '">');
        $('#home h1#username').text(data.name);
        $('#home #bio').html(data.bio);
        $('#home #location').html('<i class"fa fa-map-marker"></i> '+data.location);
        $('#home #bio').html(data.bio);
console.log(data)
    });
};
var getGitHubProjectLanguages = function (name) {
    $.get('https://api.github.com/repos/' + GitHubUername + '/' + name + '/languages', function (langs) {
        var sum = 0;
        if (Object.keys(langs).length === 0) {
            return false;
        }
        Object.keys(langs).forEach(function (key) {
            sum += langs[key];
        });
        $('[data-name="' + name + '"]').append('<div class="langs"></div>');
        Object.keys(langs).forEach(function (key) {
            var percent = ((langs[key] * 100) / sum).toFixed(1);
            $('[data-name="' + name + '"]').find('.langs').append('<div class="lang" style="background:' + langColors[key] + ';width:' + percent + '%"></div>');
        });
    });
};
var getGitHubUserRepos = function () {
    $.get('https://api.github.com/users/' + GitHubUername + '/repos', function (data) {
        $('.projects-list').find('i').remove();
        for (var i in data) {
            if (blacklist.indexOf(data[i].name) >= 0) {
//                continue;
            }

            var stars = data[i].stargazers_count > 0 ? '<span class="stars pull-right"><i class="fa fa-star"></i> ' + data[i].stargazers_count + '</span>' : '';
            var description = data[i].description ? data[i].description : '';
            var repo = '<div class="col-xs-12 project" data-name="' + data[i].name + '">' +
                    '<div class="row">' +
                    '<div class="col-xs-12 name">' +
                    '<a href="' + data[i].html_url + '">'
                    + data[i].name +
                    '</a>' + stars +
                    '</div>' +
                    '<div class="col-xs-12 description">'
                    + description +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $('.projects-list').append(repo);
            getGitHubProjectLanguages(data[i].name);
        }
    });
};
getGitHubUserRepos();
getGitHubUser();
$(document).ready(function () {
    for (var skill in skillsList) {
        $('#skills .row').append('<div class="col-lg-3 col-sm-3 col-xs-4 text-center skill-div"><i class="' + skillsList[skill].classname + ' colored" title="' + skillsList[skill].title + '"></i></div>');
    }
});