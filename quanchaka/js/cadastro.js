quanchaka.controller('main',['$scope', function(scope){
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
    titulo: "",
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