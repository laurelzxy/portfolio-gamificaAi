import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoTexto?:HTMLElement
    elementoHTML: any;
    
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
        this.elementoTexto.classList.add("sobre-gamificacao")

        // adicionar titulo e paragrafo dentro dp conteudo da div 
        this.elementoTexto.innerHTML = `<h2>O que é gamificação</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

        let actorImagem =  new Actor({
            pos: vec(engine.drawWidth - 900, engine.halfDrawHeight ),
        })
    
        // Ultilizar imagem do logo 
        let imagem = Resources.Imagem.toSprite()
    
        // Aplicar zoo na imagem 
        imagem.scale = vec(0.8, 0.8)
    
        // configurar o actor logo para usar a imagem 
        actorImagem.graphics.add(imagem)
    
        // Adicionando actor logo na tela 
        this.add(actorImagem)

        // Configurar a cena para detectar a tecla Enter e ir para a proxima cena 
        this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.Enter){
                this.fadeOutElement(this.elementoHTML)
                engine.goToScene("expoScene")
            }
        })
}
    onActivate(context: SceneActivationContext<unknown>): void {
        this.elementoHTML?.remove()
    }
}