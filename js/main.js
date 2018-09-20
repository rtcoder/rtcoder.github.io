var GitHubUername = 'rtcoder';
var repos = null;

var getGitHubUser = function () {
    $.get('https://api.github.com/users/' + GitHubUername, function (data) {
        $('#home .image').html('<img class="img-responsive" src="' + data.avatar_url + '">');
        $('#home h1#username').text(data.name);
        $('#home #bio').html(data.bio);
        $('#home #location').html('<i class="fa fa-map-marker"></i> ' + data.location);
        if (!data.hireable) {
            $('#home #hire').remove();
        }
    });
};
var getGitHubUserRepos = function () {
    $.get('https://api.github.com/users/' + GitHubUername + '/repos', function (data) {
        $('.projects-list').find('i').remove();
        for (var i in data) {

            var stars = data[i].stargazers_count > 0 ? '<span class="stars">&nbsp;&nbsp;&nbsp;<i class="fa fa-star"></i> ' + data[i].stargazers_count + '</span>' : '';
            var page = data[i].has_pages ? '<a class="gh-pages-link pull-right" target="_blank" href="https://' + GitHubUername + '.github.io/' + data[i].name + '">demo</a>' : '';
            var description = data[i].description ? data[i].description : '';

            var repo = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 project" data-name="' + data[i].name + '">' +
                    '<div class="row">' +
                    '<div class="col-xs-12 name">' +
                    '<a href="' + data[i].html_url + '">'
                    + data[i].name +
                    '</a>'
                    + page
                    + stars +
                    '</div>' +
                    '<div class="col-xs-12 description">'
                    + description +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $('.projects-list').append(repo);
        }
    });
};

getGitHubUserRepos();
getGitHubUser();
