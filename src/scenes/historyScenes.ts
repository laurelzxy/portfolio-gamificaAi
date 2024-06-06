import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    elementoTexto?:HTMLElement

    // metodo para esmacer um elemento HTML 
    fadeOutElement(elemento: HTMLElement) {
        // Pegar opacidade do elemento 
        let opacidade = parseFloat (elemento.style.opacity)

        // Repetir dimunuicao da opacidade 
        setInterval(() => {
            // Se o elemento ainda esta visivel 
            if (opacidade > 0){
                // Diminuir a opacidade 
                opacidade -= 0.01
                
                // atualizar a opacidade do elemento 
                elemento.style.opacity = opacidade.toString()
            }
            
        }, 10)


    }

    // Ao entrar ou sair da cena, ultiliza o feito de transicao lenta  
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut ({
            direction: direction,
            color:Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#483f4c")

        // Criar elemento com a descricao da empresa 
        this.elementoTexto =  document.createElement("div") as HTMLElement

        // Definir opacidade do elemento para 1 = visivel 
        this.elementoTexto.style.opacity = "1"

        // Inserir elementoTexto no container-game 
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        // Adicionar classe na div criada (elementoTexto) 
        this.elementoTexto.classList.add("sobre-gamifica")

        // adicionar titulo e paragrafo dentrp dp conteudo da div 
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`


     // Configurar actor do logo 
     let actorLogo2 =  new Actor({
        pos: vec(engine.drawWidth - 300, engine.halfDrawHeight ),
    })

    // Ultilizar imagem do logo 
    let imagemLogo = Resources.Logo2.toSprite()

    // Aplicar zoo na imagem 
    imagemLogo.scale = vec(0.7, 0.7)

    // configurar o actor logo para usar a imagem 
    actorLogo2.graphics.add(imagemLogo)

    // Adicionando actor logo na tela 
    this.add(actorLogo2)

    // Configurar a cena para monitorar o evento de tecla pressionada 
    this.input.keyboard.on("press", (event) => {
        // Caso a tecla pressionada for enter, deve ir para a proxima cena 
        if(event.key == Keys.Enter){

            // Criar transicao suave do elemento texto 
            this.fadeOutElement(this.elementoTexto!)
            // Criar transicao suave do evento

            // Direciona para a cena historia
            engine.goToScene("gamificacao")
        }
    })

   
}

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemnto texto da tela 
        this.elementoTexto?.remove()
    }
}
