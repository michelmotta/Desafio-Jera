
Vue.component("movies-list", {
    template: "#movies"
});

var app = new Vue({
    el: "#app",
    mounted() {
        this.loadMoviesList();
    },
    data: {
        loadingStatus: false,
        pageTitle: "Desafio Jera - Star Wars",
        moviesList: [],
    },
    methods: {
        loadMoviesList() {
            this.loadingStatus = true;
            axios
            .get('https://swapi.co/api/films/')
            .then(response => {
                this.moviesList = response.data.results;
                console.log(this.moviesList);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => this.loadingStatus = false)
        },
    }
});