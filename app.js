let tentativas, numeroSecreto;
let usuarioInteragiu;

function enviarTexto(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;

    if (tag == 'p' && usuarioInteragiu) {
        responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });

        usuarioInteragiu = false;
    }
}

function gerarNumSecreto() {
    let numero = Math.random() * 10 + 1;
    return parseInt(numero);
}

function reiniciarJogo() {
    tentativas = 1;
    numeroSecreto = gerarNumSecreto();

    enviarTexto('h1', 'Number Quest');
    enviarTexto('p', 'Escolha um número entre 1 e 10');

    document.getElementById('btnChutar').removeAttribute('disabled');
    document.getElementById('btnReiniciar').setAttribute('disabled', true);
}

function adicionarEvento(id, evento, funcao) {
    let btnChutar = document.getElementById(id);
    btnChutar.addEventListener(evento, funcao);
}

function verificarChute() {
    let campo = document.querySelector('input');
    let valorCampo = parseInt(campo.value);

    if (valorCampo == numeroSecreto) {
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você encontrou o número secreto com ${tentativas} ${palavraTentativas}!`;

        enviarTexto('p', mensagem);
        enviarTexto('h1', 'Parabéns! Você acertou!');

        document.getElementById('btnReiniciar').removeAttribute('disabled');
        document.getElementById('btnChutar').setAttribute('disabled', true);
    } else {
        if (valorCampo > numeroSecreto) {
            enviarTexto('p', 'O número secreto é menor');
        } else {
            enviarTexto('p', 'O número secreto é maior');
        }

        tentativas++;
    }

    campo.value = "";
}

document.body.addEventListener('click', function() {
    usuarioInteragiu = true;
});

reiniciarJogo();
adicionarEvento('btnChutar', 'click', verificarChute);
adicionarEvento('btnReiniciar', 'click', reiniciarJogo);