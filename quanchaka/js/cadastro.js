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
    nome:'nome da categoria',
    infancia: {
      disponivel: true,
      pontos: 76,
      justificativa: "justificativa infancia"
    },
    juventude: {
      disponivel: true,
      pontos: 12,
      justificativa: "justificativa juventude"
    },
    adulto: {
      disponivel: true,
      pontos: 92,
      justificativa: "justificativa adulto"
    },
    velhice: {
      disponivel: true,
      pontos: 1,
      justificativa: "justificativa velhice"
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