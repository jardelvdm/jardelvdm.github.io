quanchaka.controller('carta',['$scope','tools', function(scope,tools){
  window.scope = scope;
  scope.cartas = []
  scope.carta = null

  refCartas.on('value',data => {
    scope.cartas = objToArray(data.val());
    scope.cartasLength = scope.cartas.length;
  },error => console.log('error',error))

  scope.sorteiaCarta = () => {
    const cartasNaoUsadas = scope.cartas.filter(c => c.usada == false);
    const cartasNaoUsadasLength = cartasNaoUsadas.length;
    const numeroAleatorio = randomNumber(0,cartasNaoUsadasLength); // Baseado No Limite de cartas disponível
    scope.carta = cartasNaoUsadas[numeroAleatorio];

    scope.removeDoBaralho(scope.carta)
  }

  scope.removeDoBaralho = carta => {
    carta.usada = true;
  }
}])