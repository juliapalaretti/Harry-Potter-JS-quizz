let pontosGrif = 0;
let pontosSons = 0;
let pontosLuf = 0;
let pontosCorv = 0;
let pontosCasas = [];
let questaoAtual = 0;
let totalQuestoes = questoes.length;
let questaoDescricao = $('.questao-descricao');

$(document).ready(function(){
    pontosGrif = 0;
    pontosSons = 0;
    pontosLuf = 0;
    pontosCorv = 0;
    questaoAtual = 0;
    $('.questao').css('display', 'none');
    $('#botao-proximo').css('display', 'none');
    
});

function mostrarQuestoes() {
    questaoDescricao.text(questoes[questaoAtual].questao);
    for (let i = 0; i < 4; i++){
        let resposta = questoes[questaoAtual].respostas[i];
        $('label').eq(i).text(resposta.texto);
        $('input').eq(i).val(resposta.casa);
    }
    questaoAtual = questaoAtual + 1;
}

$('#botao-iniciar').on('click', function(){
    $('#botao-iniciar').css('display', 'none');
    $('.questao').css('display', 'block');
    $('#botao-proximo').css('display', 'block');
    $('.subtitulo').css('display', 'none');
    $('#botao-finalizar').css('display', 'none');
    mostrarQuestoes();
});

function adicionarPontos(){
    let casa = $("input[type='radio']:checked").val();
    switch(casa){
        case 'Grifinória':
            pontosGrif++;
            break;
        case 'Lufa-Lufa':
            pontosLuf++;
            break;
        case 'Sonserina':
            pontosSons++;
            break;
        case 'Corvinal':
            pontosCorv++;
            break;
    };
    mostrarQuestoes();
}

$('#botao-proximo').on('click', ()=>{
    if (questaoAtual + 1 > totalQuestoes) {
        $('#botao-proximo').css('display', 'none');
        $('#botao-finalizar').css('display', 'block');
    }
});

function mostrarCasa(){
    pontosCasas = {grifinoria: pontosGrif,
                   lufaLufa: pontosLuf, 
                   sonserina: pontosSons, 
                   corvinal: pontosCorv};
    console.log(pontosCasas);
}