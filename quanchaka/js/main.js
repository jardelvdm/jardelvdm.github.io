const quanchaka = angular.module('quanchaka',[]);

// Initialize Firebase
const config = {
	apiKey: "AIzaSyDz3HYDm0XftZh86uBQnsMBq_5__uu8Fws",
	authDomain: "quanchaka.firebaseapp.com",
	databaseURL: "https://quanchaka.firebaseio.com",
	projectId: "quanchaka",
	storageBucket: "quanchaka.appspot.com",
	messagingSenderId: "19418314953"
};

firebase.initializeApp(config);

const database = firebase.database();
const refCartas = database.ref('cartas/');
const refCategorias = database.ref('categorias/');
const novaCarta = refCartas.push();


quanchaka.service('tools', ['$http','$compile','$window','$rootScope','$q',function($http,$compile,$window,$rootScope,$q){
	this.safeApply = (scope, fn)=>{
        var phase = scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && typeof fn === 'function') {
                fn();
            }
        } else {
            scope.$apply(fn);
        }
    }; // end of fn.safeApply
}]);