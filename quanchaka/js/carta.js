quanchaka.controller('carta',['$scope','tools', function(scope,tools){
  window.scope = scope;
  scope.cartas = []
  scope.cartasClick = []
  scope.carta = null
  scope.mostraCarta = false
  scope.started = false

  window.screenTop = 1

  scope.embaralhar = () => refCartas.on('value',data => {
    scope.cartas = objToArray(data.val());
    scope.cartasLength = scope.cartas.length;
  },error => console.log('error',error))
  scope.embaralhar();

  refClick.on('value',data => {
    scope.cartasClick = objToArray(data.val());
    scope.cartasLength = scope.cartas.length;
    console.warn('scope.cartasClick',scope.cartasClick)
  },error => console.log('error',error))


  scope.carta_click = () => {
    const cartasNaoUsadas = scope.cartasClick.filter(c => c.usada == false);
    const cartasNaoUsadasLength = cartasNaoUsadas.length;
    const numeroAleatorio = randomNumber(0,cartasNaoUsadasLength); // Baseado No Limite de cartas disponível
    scope.carta = cartasNaoUsadas[numeroAleatorio];

    scope.mostraCarta = true;
    scope.carta.classe = 'click';
  }

  scope.recomecarJogo = () => {
    const listaCartas = refCartas.orderByChild("titulo");

    scope.cartas.filter(c => c.usada == true).forEach(carta => {
          database.ref(`cartas/${carta.id}/usada`).set(false);
    })

    scope.cartasClick.filter(c => c.usada == true).forEach(carta => {
          database.ref(`click/${carta.id}/usada`).set(false);
    })
  }

  scope.sorteiaCarta = () => {
    const cartasNaoUsadas = scope.cartas.filter(c => c.usada == false);
    const cartasNaoUsadasLength = cartasNaoUsadas.length;
    const numeroAleatorio = randomNumber(0,cartasNaoUsadasLength); // Baseado No Limite de cartas disponível
    scope.carta = cartasNaoUsadas[numeroAleatorio];

    scope.etapas = ['adulto','infancia','juventude','velhice'];
    scope.etapa = scope.etapas[0];

    if(!scope.carta.categoria || scope.carta.categoria == "Saúde"){
      scope.carta.classe = 'saude';
    } else if(scope.carta.categoria == "Financeiro"){
        scope.carta.classe = 'financeiro';
    } else if(scope.carta.categoria == "Profissional"){
        scope.carta.classe = 'profissional';
    } else if(scope.carta.categoria == "Psicológico"){
        scope.carta.classe = 'psicologico';
    } else if(scope.carta.categoria == "Relações"){
        scope.carta.classe = 'relacoes';
    } else if(scope.carta.categoria == "Ética"){
        scope.carta.classe = 'etica';
    } else {
      console.log('erro')
    }
    scope.mostraCarta = true;

    if(scope.carta){
      scope.removeDoBaralho(scope.carta)
    } else {
      scope.fimDeJogo = true;
    }
  }

  scope.proximaJogada = () => {
    scope.mostraCarta = false;
    document.getElementsByClassName('conteudo')[0].scrollTo(0,0);
  }

  scope.removeDoBaralho = carta => {
    carta.usada = true;

    const c = refCartas.orderByChild("titulo").equalTo(carta.titulo)
    database.ref(`cartas/${carta.id}/usada`).set(true);
  }
}])