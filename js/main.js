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
    ApacheConf: '',
    
};
var getGitHubUser = function () {
    $.get('https://api.github.com/users/' + GitHubUername, function (data) {
        return data;
    });
};
var getGitHubProjectLanguages = function (name) {
    $.get('https://api.github.com/repos/' + GitHubUername + '/' + name + '/languages', function (langs) {
//        console.log(langs)
        var sum = 0;
        Object.keys(langs).forEach(function (key) {
            sum += langs[key];
        });
        Object.keys(langs).forEach(function (key) {
            var percent = ((langs[key] * 100) / sum).toFixed(1);
            $('[data-name="' + name + '"]').find('.langs').append('<div class="lang" style="background:' + langColors[key] + ';width:' + percent + '%"></div>')
        });
    });
};

var getGitHubUserRepos = function () {
    $.get('https://api.github.com/users/' + GitHubUername + '/repos', function (data) {
        repos = data;
        $('.projects-list').find('i').remove();
        for (i in repos) {
            if (blacklist.indexOf(repos[i].name) >= 0) {
                continue;
            }


            var stars = repos[i].stargazers_count > 0 ? '<span class="stars pull-right"><i class="fa fa-star"></i> ' + repos[i].stargazers_count + '</span>' : '';

            var description = repos[i].description ? repos[i].description : '';
            var repo = '<div class="col-xs-12 project" data-name="' + repos[i].name + '">' +
                    '<div class="row">' +
                    '<div class="col-sm-6 col-md-12 name">' +
                    '<a href="' + repos[i].html_url + '">'
                    + repos[i].name +
                    '</a>' + stars +
                    '</div>' +
                    '<div class="col-sm-6 col-md-12 description">'
                    + description +
                    '</div>' +
                    '</div>' +
                    '<div class="langs"></div>'
            '</div>';


            $('.projects-list').append(repo);
            getGitHubProjectLanguages(repos[i].name);

        }
    });
};
getGitHubUserRepos();

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
});