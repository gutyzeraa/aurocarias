let arvores = [];
let cidadeX;
let gralha; // Variável para a gralha azul

function setup() {
  createCanvas(800, 400);
  cidadeX = width / 2;
  gralha = new GralhaAzul(random(0, width), random(50, 150)); // Inicializa a gralha em uma posição aleatória

  // Inicializa as árvores
  for (let i = 0; i < 5; i++) {
    let x = random(0, cidadeX - 50); // Posições aleatórias à esquerda da cidade
    let y = height / 2 + random(20, 100); // Posições aleatórias na parte inferior do campo
    arvores.push(new Arvore(x, y));
  }
}

function draw() {
  background(135, 206, 235); // céu

  // campo
  noStroke();
  fill(144, 238, 144);
  rect(0, height / 2, width, height / 2);

  // solsketch.js
  fill(250, 223, 0);
  ellipse(80, 80, 80);

  // cidade (prédios)
  for (let i = 0; i < 5; i++) {
    let x = cidadeX + i * 40;
    let y = height / 2 - 100;
    let largura = 30;
    let altura = 100;

    // Prédio
    fill(100);
    rect(x, y, largura, altura);

    // Janelas (3 linhas, 2 colunas por prédio)
    let janelaLargura = 6;
    let janelaAltura = 10;
    let espacamentoX = 8;
    let espacamentoY = 20;

    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 2; coluna++) {
        let janelaX = x + 5 + coluna * espacamentoX;
        let janelaY = y + 10 + linha * espacamentoY;
        fill(255, 255, 150); // Amarelo claro (luz)
        rect(janelaX, janelaY, janelaLargura, janelaAltura);
      }
    }
  }

  // campo (arvores)
  for (let arvore of arvores) {
    arvore.mostrar();
  }

  // Desenha e move a gralha
  gralha.mover();
  gralha.mostrar();
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 0;
  }

  mostrar() {
    this.altura = min(this.altura + 1, 80); // Crescimento mais alto

    // Tronco
    fill(101, 67, 33);
    rect(this.x - 2, this.y - this.altura, 4, this.altura);

    // Camadas da copa da araucária (em forma de disco)
    let numCamadas = 3;
    let camadaAltura = 15;
    let camadaLargura = [60, 45, 30]; // Tamanho das copas

    for (let i = 0; i < numCamadas; i++) {
      fill(34, 139, 34);
      ellipse(
        this.x,
        this.y - this.altura - i * camadaAltura,
        camadaLargura[i],
        15
      );
    }
  }
}

class GralhaAzul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = random(-2, 2); // Velocidade horizontal aleatória
    this.velY = random(-1, 1); // Velocidade vertical aleatória
    this.tamanhoCorpo = 20;
    this.tamanhoCabeca = 15;
    this.alturaCabeca = 5;
    this.tamanhoAsa = 10;
    this.tamanhoBicoBase = 5;
    this.alturaBico = 2;
    this.posicaoOlhoX = 5;
    this.posicaoOlhoY = 1;
    this.tamanhoOlho = 2;
    this.corCorpo = color(0, 102, 204);
    this.corAsa = color(0, 76, 153);
    this.corBico = color(255, 153, 51);
    this.corOlho = color(255);
  }

  mover() {
    this.x += this.velX;
    this.y += this.velY;

    // Limites para a gralha não sair da tela
    if (this.x > width + this.tamanhoCorpo || this.x < -this.tamanhoCorpo) {
      this.velX *= -1; // Inverte a direção horizontal
    }
    if (this.y > height || this.y < 0) {
      this.velY *= -1; // Inverte a direção vertical
    }
  }

  mostrar() {
    push(); // Salva o estado de transformação atual
    translate(this.x, this.y); // Move a origem para a posição da gralha

    // Corpo
    fill(this.corCorpo);
    ellipse(0, 0, this.tamanhoCorpo, this.tamanhoCorpo / 2); // corpo

    // Cabeça
    fill(this.corCorpo);
    ellipse(this.tamanhoCorpo / 2, -this.alturaCabeca, this.tamanhoCabeca, this.tamanhoCabeca / 2); // cabeça

    // Asa
    fill(this.corAsa);
    triangle(-this.tamanhoCorpo / 2, 0, 0, -this.tamanhoAsa, this.tamanhoCorpo / 4, 0);

    // Bico
    fill(this.corBico);
    triangle(this.tamanhoCorpo / 2 + this.tamanhoBicoBase, -this.alturaCabeca, this.tamanhoCorpo / 2 + this.tamanhoBicoBase * 2, -this.alturaCabeca + this.alturaBico, this.tamanhoCorpo / 2 + this.tamanhoBicoBase, -this.alturaCabeca + this.alturaBico * 2);

    // Olho
    fill(this.corOlho);
    ellipse(this.tamanhoCorpo / 2 + this.posicaoOlhoX, -this.alturaCabeca - this.posicaoOlhoY, this.tamanhoOlho);

    pop(); // Restaura o estado de transformação anterior
  }
}
