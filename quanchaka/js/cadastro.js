quanchaka.controller('main',['$scope','tools', function(scope,tools){
  window.scope = scope;
  scope.cartas = []
  scope.categorias = []

  refCartas.on('value',data => {
    tools.safeApply(scope, function(){
      scope.cartas = objToArray(data.val());
    })
  },error => {
    console.log('error',error)
  })

  refCategorias.on('value',data => {
    tools.safeApply(scope, function(){
      scope.categorias = objToArray(data.val())
    })
  },error => {
    console.log('error',error)
  })

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
    scope.carta.categorias.push(angular.copy(scope.modeloCategoria))
  }   
  
  scope.removerCategoria = (index) => {
    scope.carta.categorias.splice(index,1)
  }
  
  scope.escreveCarta = () => {
    console.log('scope.carta',scope.carta)
    
    console.warn('escreveCarta',novaCarta.set(scope.carta))
  }
}])