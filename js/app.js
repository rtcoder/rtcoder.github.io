new Vue({
    el: '#app',
    data: () => ({
        view: 'card',
        gitHubUername: 'rtcoder',
        apiUrl: 'https://api.github.com/',
        userData: null,
        repos: [],
        windowWidth: 0,
        columnsCount: 3
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
                this.repos = this.chunkArray(response.data, response.data.length / this.columnsCount);
                this.changeColumns();
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
        },
        getWindowWidth(event) {
            this.windowWidth = document.documentElement.clientWidth;
            this.changeColumns();
        },
        changeColumns() {
            if (!this.repos.length) {
                return;
            }

            let columnsCount = this.columnsCount;

            if (this.windowWidth >= 700) {
                columnsCount = 3;
            } else if (this.windowWidth < 700 && this.windowWidth >= 500) {
                columnsCount = 2;
            } else {
                columnsCount = 1;
            }

            if (columnsCount === this.columnsCount) {
                return;
            }
            this.columnsCount = columnsCount;
            const tmp = [];
            for (const arr of this.repos) {
                for (const obj of arr) {
                    tmp.push(obj);
                }
            }
            this.repos = this.chunkArray(tmp, tmp.length / this.columnsCount);

        }
    },
    mounted(event) {
        this.getUser();
        this.getRepos();
        this.getWindowWidth(event);
        window.addEventListener('resize', this.getWindowWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    }
});