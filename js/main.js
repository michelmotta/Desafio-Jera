Vue.component("loading-div", {
    template: "#loading"
});

var app = new Vue({
    el: "#app",
    mounted() {
        console.log('HTML CARREGADO!!!');
    },
    data: {
        loadingStatus: false,
        pageTitle: "Desafio Jera - Star Wars"
    },
    methods: {

    }
});