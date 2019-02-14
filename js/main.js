
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
        emptySearchResult: false,
        pageTitle: "Desafio Jera - Star Wars",
        searchTerm: "",
        moviesList: [],
    },
    filters: {
        formateDate(str) {
            var data = new Date(str);
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'),
            ano  = data.getFullYear();
            return dia+"/"+mes+"/"+ano;
        }
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
        searchMovieByName() {
            if(this.searchTerm != ""){
                this.loadingStatus = true;
                axios
                .get('https://swapi.co/api/films/?search=' + this.searchTerm)
                .then(response => {
                    this.moviesList = response.data.results;
                    console.log(this.moviesList);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loadingStatus = false)
            } else {
                alert("Você precisa digitar algo para pesquisar!");
            }
            console.log(this.searchTerm);
        }
    }
});