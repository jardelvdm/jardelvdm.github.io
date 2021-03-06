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

  scope.jogador = {
    xp:0,
    etapa:0,
    categorias: [
      {nome: 'Saúde', pontos:0 },
      {nome: 'Financeiro', pontos:0 },
      {nome: 'Profissional', pontos:0 },
      {nome: 'Psicológico', pontos:0 },
      {nome: 'Relações', pontos:0 },
      {nome: 'Ética', pontos:0 }
    ]
  }

  scope.etapas = [
    {nome: 'infancia', xp:0},
    {nome: 'juventude', xp:20}, 
    {nome: 'adulto', xp:50},
    {nome: 'velhice', xp:80}
  ];
  scope.etapa = scope.etapas[scope.jogador.etapa];

  scope.pontuaCategorias = categorias => {
    categorias.forEach(c => {
      const categoria = scope.jogador.categorias.find(jc => jc.nome == c.nome)
      const etapaAtual = scope.etapas[scope.jogador.etapa].nome;
      categoria.pontos += c[etapaAtual].pontos
    })
  }

  scope.atualizaProgressoJogador = () => {
    // atualiza os pontos de cada categoria
    if(!scope.carta.opcoes){
      scope.pontuaCategorias(scope.carta.categorias);
    }

    // atualiza o progresso geral no jogo
    scope.jogador.xp += scope.carta.xp;
    scope.jogador.etapa = scope.etapas.filter(etapa => etapa.xp <= scope.jogador.xp).length - 1;

    scope.etapa = scope.etapas[scope.jogador.etapa];

    // console.log('scope.jogador', scope.jogador);
  }

  scope.sorteiaCarta = () => {
    // filtra as cartas não usadas e que tenham pontuações na fase atual
    const cartasNaoUsadas = scope.cartas
      // .filter(carta => carta.opcoes)
      .filter(carta => carta.usada == false);
    const cartasNaoUsadasLength = cartasNaoUsadas.length;
    const numeroAleatorio = randomNumber(0,cartasNaoUsadasLength); // Baseado No Limite de cartas disponível
    scope.carta = cartasNaoUsadas[numeroAleatorio];
    
    console.log(numeroAleatorio,cartasNaoUsadas)
    console.log(scope.carta)

    if (scope.carta) {
      scope.atualizaProgressoJogador();

      if (!scope.carta.categoria || scope.carta.categoria == "Saúde") {
        scope.carta.classe = 'saude';
        scope.carta.categoria = "Saúde";
      } else if (scope.carta.categoria == "Financeiro") {
        scope.carta.classe = 'financeiro';
      } else if (scope.carta.categoria == "Profissional") {
        scope.carta.classe = 'profissional';
      } else if (scope.carta.categoria == "Psicológico") {
        scope.carta.classe = 'psicologico';
      } else if (scope.carta.categoria == "Relações") {
        scope.carta.classe = 'relacoes';
      } else if (scope.carta.categoria == "Ética") {
        scope.carta.classe = 'etica';
      } else {
        console.log('erro')
      }
      
      scope.mostraCarta = true;
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
    return;
    carta.usada = true;

    const c = refCartas.orderByChild("titulo").equalTo(carta.titulo)
    database.ref(`cartas/${carta.id}/usada`).set(true);
  }

  scope.ajustaPonto = catPonto => {
    var pontos = 0;
    console.log('pontos',pontos)
    console.log('catPonto',catPonto)
    if(catPonto.pontos < 0){
      pontos = catPonto.pontos;
      console.log('if',pontos)
    } else {
      catPonto.pontos += 1;
      pontos = catPonto.pontos;
      console.log('else',pontos)
    }

    console.log(pontos)
    return pontos;
  }
}])