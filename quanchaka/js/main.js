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
const novaCarta = refCartas.push();