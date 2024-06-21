let questoes = [];
let pontosGrif = 0;
let pontosSons = 0;
let pontosLuf = 0;
let pontosCorv = 0;
let pontosCasas = [];
let questaoAtual = 0;
let totalQuestoes = 0;
let imagemCasa = '';
let introCasa = '';
let descCasa = '';
let corCasa = '';
let questaoDescricao = $('.questao-descricao');

function carregarQuestoes(){
    fetch('questoes.json')
        .then(response => response.json())
        .then(data => {
            questoes = data;
            totalQuestoes = data.length;
        })
        .catch(error => console.error('Erro ao carregar as questões:', error))
}

$(document).ready(function(){
    pontosGrif = 0;
    pontosSons = 0;
    pontosLuf = 0;
    pontosCorv = 0;
    questaoAtual = 0;
    $('.questao').css('display', 'none');
    $('#botao-proximo').css('display', 'none');
    $('#container-resultado').css('display', 'none');
    carregarQuestoes();
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

function mostrarCasaEscolhida(casaFinal){
    $('#container-questoes').css('display', 'none');
    $('#container-resultado').css('display', 'flex');

    if (casaFinal == 'grifinoria') {
        imagemCasa = 'images/grif.jpg';
        introCasa = 'Grifinória';
        corCasa = 'rgb(144, 0, 0)';
        descCasa = "Quem sabe sua morada é a Grifinória, Casa onde habitam os corações indômitos. Ousadia e sangue-frio e nobreza Destacam os alunos da Grifinória dos demais";
    }
    else if (casaFinal == 'sonserina') {
        imagemCasa = 'images/sly.jpg';
        introCasa = 'Sonserina';
        corCasa = 'rgb(4, 116, 25)';
        descCasa = "Ou quem sabe a Sonserina seria a sua casa E ali faria seus verdadeiros amigos Homens de astúcia que usam quaisquer meios Para atingir os fins que antes colimaram";
    }
    else if (casaFinal == 'corvinal') {
        imagemCasa = 'images/rav.jpg';
        introCasa = 'Corvinal';
        corCasa = 'rgb(14, 14, 173)';
        descCasa = "Ou seria a velha e sábia Corvinal, A casa dos que têm a mente sempre alerta Onde os homens de grande espírito e saber Sempre encontrarão companheiros seus iguais";
    }
    else {
        imagemCasa = 'images/huf.jpg';
        introCasa = 'Lufa-Lufa';
        corCasa = 'rgb(211, 183, 23)';
        descCasa = "Quem sabe é na Lufa-Lufa que você vai morar, Onde seus soldados são justos e leais Pacientes, sinceros, sem medo da dor";
    }

    $('#img-casa').html("<img src='" + imagemCasa + "'>");
    $('.casa').text(introCasa).css('color', corCasa);
    $('.casa-descricao').text(descCasa).css('color', corCasa);
}

function mostrarCasa(){
    pontosCasas = {grifinoria: pontosGrif,
                   lufaLufa: pontosLuf, 
                   sonserina: pontosSons, 
                   corvinal: pontosCorv};
    let casaEscolhida = Object.keys(pontosCasas).reduce((a, b)=>{
        return pontosCasas[a] > pontosCasas[b] ? a : b;
    });
    mostrarCasaEscolhida(casaEscolhida);
}