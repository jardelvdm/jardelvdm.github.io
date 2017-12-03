quanchaka.controller('main',['$scope','tools', function(scope,tools){
  window.scope = scope;
  scope.tools = tools;
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

  scope.fn_opcao = {
    modelo:{
      nome:'',
      categorias: [angular.copy(scope.modeloCategoria)]
    },
    ativaOpcoes: () => {
      scope.carta.opcoes = []
      for (let x = scope.carta.categorias.length; x >= 0; x--){
        scope.carta.categorias.splice(x,1)
      }
    },
    adicionar: () => scope.carta.opcoes.push(angular.copy(scope.fn_opcao.modelo)),
    remover: (index) => scope.carta.opcoes.splice(index,1),
    adicionarCategoria: opcao => scope.carta.opcoes[opcao].categorias.push(angular.copy(scope.modeloCategoria)),
    removerCategoria: (opcao,index) => scope.carta.opcoes[opcao].splice(index,1)
  }

  scope.carta = angular.copy(scope.estruturaCarta)
        
  scope.adicionarCategoria = () => {
    scope.carta.categorias.push(angular.copy(scope.modeloCategoria))
  }   
  
  scope.removerCategoria = (index) => {
    scope.carta.categorias.splice(index,1)
  }
  
  scope.escreveCarta = () => {
    novaCarta.set(scope.carta)
  }
}])