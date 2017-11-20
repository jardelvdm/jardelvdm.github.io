quanchaka.controller('carta',['$scope','tools', function(scope,tools){
  window.scope = scope;
  scope.cartas = []
  scope.carta = null

  scope.embaralhar = () => refCartas.on('value',data => {
    scope.cartas = objToArray(data.val());
    scope.cartasLength = scope.cartas.length;
  },error => console.log('error',error))
  scope.embaralhar();

  scope.recomecarJogo = () => {
    const listaCartas = refCartas.orderByChild("titulo");

    scope.cartas.filter(c => c.usada == true).forEach(carta => {
          database.ref(`cartas/${carta.id}/usada`).set(false);
    })


  }

  scope.sorteiaCarta = () => {
    const cartasNaoUsadas = scope.cartas.filter(c => c.usada == false);
    const cartasNaoUsadasLength = cartasNaoUsadas.length;
    const numeroAleatorio = randomNumber(0,cartasNaoUsadasLength); // Baseado No Limite de cartas disponível
    scope.carta = cartasNaoUsadas[numeroAleatorio];

    if(scope.carta){
      scope.removeDoBaralho(scope.carta)
    } else {
      scope.fimDeJogo = true;
    }
  }

  scope.removeDoBaralho = carta => {
    carta.usada = true;

    const c = refCartas.orderByChild("titulo").equalTo(carta.titulo)
    database.ref(`cartas/${carta.id}/usada`).set(true);
  }
}])