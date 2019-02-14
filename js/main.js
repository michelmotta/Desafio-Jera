Vue.component("loading-div", {
    template: "#loading"
});

var app = new Vue({
    el: "#app",
    mounted() {
        this.loadMoviesList();
    },
    data: {
        loadingStatus: false,
        pageTitle: "Desafio Jera - Star Wars"
    },
    methods: {
        loadMoviesList() {
            console.log('Movies loaded!!');
        }
    }
});