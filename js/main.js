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
        loadingModalContentTabStatus: false,
        counter: 0,
        prevPage: null,
        nextPage: null,
        movieUrl: null,
        pageTitle: "Desafio Jera - Star Wars",
        searchTerm: "",
        moviesList: [],
        movieCharactersList: [],
        moviePlanetsList: [],
        movieStarshipsList: [],
        movieVehiclesList: [],
        movieSpeciesList: [],
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
        },
        formateWaterInfo(str) {
            if(str == 1){
                return "Yes";
            } else {
                return "No"
            }
        }
    },
    methods: {
        onChangeSelect(event) {
            if(event.target.value == "name"){
                this.moviesList.sort((a, b) => (a.title > b.title) ? 1 : -1)
            }
            if(event.target.value == "date"){
                this.moviesList.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1)
            }
        },
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
        loadMovieCharactersOnClick(){
            this.loadMovieCharacters(this.movieItem.charactersUrls);
        },
        loadMovieCharacters(movieCharactersUrls){
            if(movieCharactersUrls != null && movieCharactersUrls != ""){
                this.loadingModalContentTabStatus = true;
                this.counter = 0;
                this.movieCharactersList = [];
                movieCharactersUrls.forEach(movieCharactersUrl =>{ 
                    axios
                    .get(movieCharactersUrl)
                    .then(response => {
  
                        movieCharacter = {
                            name: response.data.name,
                            height: response.data.height,
                            mass: response.data.mass,
                            hair_color: response.data.hair_color,
                            skin_color: response.data.skin_color,
                            eye_color: response.data.eye_color,
                            gender: response.data.gender
                        };

                        this.movieCharactersList.push(movieCharacter);
                        this.counter++;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        if(this.counter == movieCharactersUrls.length) {
                            this.loadingModalContentTabStatus = false;
                        }
                    })
                });
            }
        },
        loadMoviePlanetsOnClick(){
            this.loadMoviePlanets(this.movieItem.planetsUrls);
        },
        loadMoviePlanets(moviePlanetsUrls){
            if(moviePlanetsUrls != null && moviePlanetsUrls != ""){
                this.loadingModalContentTabStatus = true;
                this.counter = 0;
                this.moviePlanetsList = [];
                moviePlanetsUrls.forEach(moviePlanetsUrl =>{ 
                    axios
                    .get(moviePlanetsUrl)
                    .then(response => {
  
                        moviePlanet = {
                            name: response.data.name,
                            climate: response.data.climate,
                            gravity: response.data.gravity,
                            surface_water: response.data.surface_water,
                            population: response.data.population
                        };

                        this.moviePlanetsList.push(moviePlanet);
                        this.counter++;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        if(this.counter == moviePlanetsUrls.length) {
                            this.loadingModalContentTabStatus = false;
                        }
                    })
                });
            }
        },
        loadMovieSpeciesOnClick(){
            this.loadMovieSpecies(this.movieItem.speciesUrls);
        },
        loadMovieSpecies(movieSpeciesUrls){
            if(movieSpeciesUrls != null && movieSpeciesUrls != ""){
                this.loadingModalContentTabStatus = true;
                this.counter = 0;
                this.movieSpeciesList = [];
                movieSpeciesUrls.forEach(movieSpeciesUrl =>{ 
                    axios
                    .get(movieSpeciesUrl)
                    .then(response => {
  
                        movieSpecie = {
                            name: response.data.name,
                            classification: response.data.classification,
                            designation: response.data.designation,
                            average_lifespan: response.data.average_lifespan,
                            language: response.data.language
                        };

                        this.movieSpeciesList.push(movieSpecie);
                        this.counter++;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        if(this.counter == movieSpeciesUrls.length) {
                            this.loadingModalContentTabStatus = false;
                        }
                    })
                });
            }
        },
        loadMovieStarshipsOnClick(){
            this.loadMovieStarships(this.movieItem.starshipsUrls);
        },
        loadMovieStarships(movieStarshipsUrls){
            if(movieStarshipsUrls != null && movieStarshipsUrls != ""){
                this.loadingModalContentTabStatus = true;
                this.counter = 0;
                this.movieStarshipsList = [];
                movieStarshipsUrls.forEach(movieStarshipsUrl =>{ 
                    axios
                    .get(movieStarshipsUrl)
                    .then(response => {
  
                        movieStarship = {
                            name: response.data.name,
                            model: response.data.model,
                            manufacturer: response.data.manufacturer,
                            crew: response.data.crew,
                            starship_class: response.data.starship_class
                        };

                        this.movieStarshipsList.push(movieStarship);
                        this.counter++;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        if(this.counter == movieStarshipsUrls.length) {
                            this.loadingModalContentTabStatus = false;
                        }
                    })
                });
            }
        },
        loadMovieVehiclesOnClick(){
            this.loadMovieVehicles(this.movieItem.vehiclesUrls);
        },
        loadMovieVehicles(movieVehiclesUrls){
            if(movieVehiclesUrls != null && movieVehiclesUrls != ""){
                this.loadingModalContentTabStatus = true;
                this.counter = 0;
                this.movieVehiclesList = [];
                movieVehiclesUrls.forEach(movieVehiclesUrl =>{ 
                    axios
                    .get(movieVehiclesUrl)
                    .then(response => {
  
                        movieVehicle = {
                            name: response.data.name,
                            model: response.data.model,
                            manufacturer: response.data.manufacturer,
                            crew: response.data.crew,
                            vehicle_class: response.data.vehicle_class
                        };

                        this.movieVehiclesList.push(movieVehicle);
                        this.counter++;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        console.log(this.counter);
                        console.log(movieVehiclesUrls.length);
                        if(this.counter == movieVehiclesUrls.length) {
                            this.loadingModalContentTabStatus = false;
                        }
                    })
                });
            }
        }
    }
});