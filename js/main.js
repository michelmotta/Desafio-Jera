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
            if(movieCharactersUrls != null){
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                });
            }
        },
        loadMoviePlanetsOnClick(){
            this.loadMoviePlanets(this.movieItem.planetsUrls);
        },
        loadMoviePlanets(moviePlanetsUrls){
            if(moviePlanetsUrls != null){
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                });
            }
        },
        loadMovieSpeciesOnClick(){
            this.loadMovieSpecies(this.movieItem.speciesUrls);
        },
        loadMovieSpecies(movieSpeciesUrls){
            if(movieSpeciesUrls != null){
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                });
            }
        },
        loadMovieStarshipsOnClick(){
            this.loadMovieStarships(this.movieItem.starshipsUrls);
        },
        loadMovieStarships(movieStarshipsUrls){
            if(movieStarshipsUrls != null){
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                });
            }
        },
        loadMovieVehiclesOnClick(){
            this.loadMovieVehicles(this.movieItem.vehiclesUrls);
        },
        loadMovieVehicles(movieVehiclesUrls){
            if(movieVehiclesUrls != null){
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
                    })
                    .catch(error => {
                        console.log(error);
                    });
                });
                console.log(this.movieVehiclesList);
            }
        }
    }
});