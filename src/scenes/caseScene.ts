import { Actor, Color, Engine, FadeInOut, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene{
    private objetoInteracao: any
    elementoTexto?: HTMLElement

    private textoDaCena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray
    }
    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados das cenas passadas 
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);

        // Se for a mesa A 
        if (this.objetoInteracao.nomeDoActor ==  "mesa_strand_a") {
            this.textoDaCena = "Essa é a descrição do case a"

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
        this.elementoTexto.innerHTML = `<h2> Cases de Sucesso</h2>
        <p>em nossa empresa</p>`
    }

    let actorNpc1 =  new Actor({
        pos: vec(engine.drawWidth - 300, engine.halfDrawHeight ),
    })

    let Npc1 = Resources.Npc1.toSprite()

    Npc1.scale = vec(0.7, 0.7)

    Npc1.graphics.add(Npc1)













    if (this.objetoInteracao.nomeDoActor ==  "mesa_strand_b") {
            this.textoDaCena = "Essa é a descrição do case b"
        }
        if (this.objetoInteracao.nomeDoActor ==  "mesa_strand_") {
            this.textoDaCena = "Essa é a descrição do case c"
        }


    }


}