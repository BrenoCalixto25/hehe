confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "3/6": titulo = "03 de Junho de 2023"; mensagem = "<p>#</p>";break;
            case "26/9": titulo = "26 de Setembro de 2023"; mensagem = "<p>Passando pra te desejar feliz aniversário, que Deus te abençoe sempre, e em todos os seus feitos, que seus planos, metas, objetivos todos tenham sucesso. Eu lhe admiro muito, tanto como amigo, quanto namorado de Brenda e como o homem que você é. Você mostra maturidade, em suas atitudes, mostra ser uma pessoa de palavra ao falar, mostra ser inteligente pra caralho quando pensa em fazer algo ou planejar! E cara! Lhe admiro demais, e você é alguém que me tenho inspiração e meta de alguma parte minha ter o que você tem, todo o esforço, dedicação, maturidade, e sou grato por Brenda ter te encontrado, por ter você na vida dela, e por estar perto de alguém tão incrível como você. Que seu dia esteja sendo muito foda porque você merece demais, tudo de bom sempre pra você! E conte comigo sempre, sempre, sei que fico mais na minha, tenho esse jeito assim, porém o que eu puder fazer por você o que ninguém fez por mim... conta comigo! Eu faço! Você é importante. Muito!!! Felicidades mano! Muitos anos de vida!!!</p>";break;
            case "15/5": titulo = "15 de Maio de 2021"; mensagem = "<p>#</p>";break;
            case "22/5": titulo = "22 de Maio de 2021"; mensagem = "<p>#</p>";break;
            case "29/5": titulo = "29 de Maio de 2021"; mensagem = "<p>#</p>";break;
            case "3/6": titulo = "03 de Junho de 2021"; mensagem = "<p>#</p>";break;
            case "5/6": titulo = "05 de Junho de 2021"; mensagem = "<p>#</p>";break;
            case "12/6": titulo = "12 de Junho de 2021"; mensagem = "<p>#</p>";break;
            case "13/6": titulo = "13 de Junho de 2021"; mensagem = "<p>#</p>";break;
            // case "19/6": titulo = "19 de Junho de 2021"; mensagem = "<section class='text-center'><p class='letra-vermelha'><strong>Este momento está sendo escrito agora...</strong></p></section>";break;
            // case "final": titulo = "12 de Junho de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}