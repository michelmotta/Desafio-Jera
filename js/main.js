Vue.component("loading-element", {
    template: "#loading"
});

var app = new Vue({
    el: "#app",
    mounted() {
        this.loadMoviesListOnStart();
    },
    data: {
        loadingStatus: false,
        loadingModalStatus: false,
        prevPage: null,
        nextPage: null,
        movieUrl: null,
        pageTitle: "Desafio Jera - Star Wars",
        searchTerm: "",
        moviesList: [],
        movieCharacters: [],
        movieItem: {
            title: "",
            charactersUrls: [],
            planetsUrls: [],
            starshipsUrls: [],
            vehiclesUrls: [],
            speciesUrls: []
        }
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
        loadMoviesListOnStart() {
            this.loadingStatus = true;
            axios
            .get('https://swapi.co/api/films/')
            .then(response => {
                this.moviesList = response.data.results;
                this.movieUrl = response.url;
                this.prevPage = response.data.prev;
                this.nextPage = response.data.nex;
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
                    this.prevPage = response.data.prev;
                    this.nextPage = response.data.nex;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loadingStatus = false)
            } else {
                this.loadMoviesListOnStart();
            }
        },
        moviesPageNavigation(pageUrl){
            if(pageUrl != null){
                this.loadingStatus = true;
                axios
                .get(pageUrl)
                .then(response => {
                    this.moviesList = response.data.results;
                    this.prevPage = response.data.prev;
                    this.nextPage = response.data.nex;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loadingStatus = false)
            }
        },
        loadSingleMovie(movieUrl){
            if(movieUrl != null){
                this.loadingModalStatus = true;
                this.movieItem.title = "";
                axios
                .get(movieUrl)
                .then(response => {
                    this.movieItem.title = response.data.title;
                    this.movieItem.charactersUrls = response.data.characters;
                    this.movieItem.planetsUrls = response.data.planets;
                    this.movieItem.starshipsUrls = response.data.starships;
                    this.movieItem.vehiclesUrls = response.data.vehicles;
                    this.movieItem.speciesUrls = response.data.species;
                    this.loadMovieCharacters(this.movieItem.charactersUrls);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => this.loadingModalStatus = false)
            }
        },
        loadMovieCharacters(movieCharactersUrls){
            if(movieCharactersUrls != null){
                this.movieCharacters = [];
                movieCharactersUrls.forEach(movieCharactersUrl =>{ 
                    axios
                    .get(movieCharactersUrl)
                    .then(response => {
                        this.movieCharacters.push(response.data.name);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    //.finally(() => this.loadingModalStatus = false)
                });
            }
        }
    }
});