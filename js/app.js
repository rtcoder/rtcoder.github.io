new Vue({
    el: '#app',
    data: () => ({
        view: 'card',
        gitHubUername: 'rtcoder',
        apiUrl: 'https://api.github.com/',
        userData: null,
        repos: []
    }),
    methods: {
        getUser() {
            const url = this.apiUrl + 'users/' + this.gitHubUername;
            this.$http.get(url).then(response => {
                this.userData = response.data;
            }, error => {
                console.log(error.statusText);
            });
        },
        getRepos() {
            const url = this.apiUrl + 'users/' + this.gitHubUername + '/repos';
            this.$http.get(url).then(response => {
                this.repos = this.chunkArray(response.data, response.data.length/3);
            }, error => {
                console.log(error.statusText);
            });
        },
        chunkArray(arr, chunk_size) {
            var arrayLength = arr.length;
            var tempArray = [];

            for (let index = 0; index < arrayLength; index += chunk_size) {
                const myChunk = arr.slice(index, index + chunk_size);
                tempArray.push(myChunk);
            }

            return tempArray;
        }
    },
    mounted() {
        this.getUser();
        this.getRepos();
    }
});