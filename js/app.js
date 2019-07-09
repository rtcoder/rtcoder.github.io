new Vue({
    el: '#app',
    data: () => ({
        gitHubUername: 'rtcoder',
        apiUrl: 'https://api.github.com/',
        userData: {},
        repos: [],
        gists: [],
        columnsCount: 3,
        langColors: {}
    }),
    methods: {
        getUser() {
            this.$http.get(`${this.apiUrl}users/${this.gitHubUername}`)
                .then(response => this.userData = response.data
                    , error => console.log(error.statusText));
        },
        getRepos() {
            this.$http.get(`${this.apiUrl}users/${this.gitHubUername}/repos`)
                .then(response => this.repos = response.data
                    , error => console.log(error.statusText));
        },
        getGists() {
            this.$http.get(`${this.apiUrl}users/${this.gitHubUername}/gists`)
                .then(response => this.gists = response.data
                    , error => console.log(error.statusText));
        },
        getLangsColors() {
            this.$http.get('https://gist.github.com/rtcoder/dec3feab629683d998398c961c1092f5.js')
                .then(response => this.langColors = response.data
                    , error => console.log(error.statusText));
        },
        getFirstFilenameFromGist(gist) {
            return Object.keys(gist.files)[0];
        }
    },
    mounted(event) {
        this.getUser();
        this.getRepos();
        this.getGists();
        this.getLangsColors();
    }
});
