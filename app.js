// let titulo = document.querySelector('h1'); // Seleciona a tag H1 para a variável título
// titulo.innerHTML = 'Jogo do número secreto'; // Dá o nome do título para a tag
//
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Cria array para armazenar lista de números sorteados
let listaDeNumerosSorteados = [];

// Cria número limite que pode ser sorteado
let numeroLimite = 100;

// Armazena o número aleatório gerado pela função
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para substituir os dois códigos acima
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});

}

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');

}
exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // Armazena o valor do campo input


    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou. Parabéns');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);

        // Habilita o botão Novo Jogo após o acerto
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor. Tente novamente');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior. Tente novamente');
        }
        tentativas++;
        limparCampo();
    }
}

// Gera número aleatório dentro do intervalo determinado
// Verifica se o número já existe dentro do array
// Se existir, sorteia outro e coloca no array
// Caso contrário, coloca o mesmo no array
function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * 100) + 1;

    // Verifica se a lista de números sorteados está cheia
    // Em caso positivo esvazia a lista
    let quantidadeDeNumerosSorteados = listaDeNumerosSorteados.length;
    if (quantidadeDeNumerosSorteados == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Limpa o campo input após o chute
function limparCampo() {
    chute = document.querySelector('input').value = '';
}

// Reiniciar o jogo, limpar o campo, zerar tentativas
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
}