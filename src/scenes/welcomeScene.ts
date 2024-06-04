import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Repeat, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {

    // Ao entrar ou sair da cena, ultiliza o feito de transicao lenta  
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut ({
            direction: direction,
            color:Color.Black,
            duration: 1000
        })
    }
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        // Configura o objeto para ser a frase de Bem Vindo 
        let fraseBemVindo = new Label({
            text: "Bem Vindo ao Portfólio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300 ), 
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            
            })
        })
        // Adiciona a frase na cena,tela 
        this.add(fraseBemVindo)

        // Configurar actor do logo 
        let actorLogo =  new Actor({
            pos: vec(engine.drawWidth / 2, 430),


        })

        // Ultilizar imagem do logo 
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoo na imagem 
        imagemLogo.scale = vec(0.4, 0.4)

        // configurar o actor logo para usar a imagem 
        actorLogo.graphics.add(imagemLogo)

        // Adicionando actor logo na tela 
        this.add(actorLogo)

        // Adicionando enter para iniciar 
        let fraseEnter = new Label ({
            text: "Pressione \"Enter\" para iniciar..." , 
            width: 5,
            height: 5,
            pos: vec(engine.drawWidth / 2, 600 ), 
            font: new Font({
                color: Color.White,
                size: 25,
                textAlign: TextAlign.Center,
                family: "Anta"
            
            })

        })
        this.add(fraseEnter)

        fraseEnter.actions.repeatForever((Repeat) => {
            Repeat.fade(0, 500)
            Repeat.fade(1, 500)

        })

        //monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for enter, deve ir para a proxima cena 
            if(event.key == Keys.Enter){
                // Direciona para a cena historia
                engine.goToScene("historia")
            }
        })
    }
   
}