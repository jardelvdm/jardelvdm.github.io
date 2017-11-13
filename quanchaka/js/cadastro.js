const quanchaka = angular.module('quanchaka',[]);
quanchaka.controller('main',['$scope', function(scope){
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

  scope.cartas = []

  scope.modeloCategoria = {
    nome:'',
    infancia: {
      disponivel: true,
      pontos: 0,
      justificativa: ""
    },
    juventude: {
      disponivel: true,
      pontos: 0,
      justificativa: ""
    },
    adulto: {
      disponivel: true,
      pontos: 0,
      justificativa: ""
    },
    velhice: {
      disponivel: true,
      pontos: 0,
      justificativa: ""
    }
  }

  scope.estruturaCarta = {
    titulo: "carta",
    usada: false,
    categorias: [angular.copy(scope.modeloCategoria)]
  }

  scope.carta = angular.copy(scope.estruturaCarta)
        
  scope.adicionarCategoria = () => {
    scope.carta.categorias.push(angular.copy(scope.categoria))
  }   
  
  scope.removerCategoria = (index) => {
    scope.carta.categorias.splice(index,1)
  }
  
  scope.escreveCarta = () => {
    console.log('scope.carta',scope.carta)
    
    novaCarta.set(scope.carta)
  }
}])