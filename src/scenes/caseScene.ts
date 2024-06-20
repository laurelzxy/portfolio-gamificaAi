import { Actor, Color, Engine, FadeInOut, Graphic, Keys, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene{
    private objetoInteracao: any
    private elementoTexto?: HTMLElement
    private actorEmpresa?: Actor
    private listaImagem?: Sprite[]

    private textoDaCena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        // Criar elemento com a descricsao do case 
        this.elementoTexto =  document.createElement("div") as HTMLElement
        this.elementoTexto.classList.add("texto-case")

        // adiconar o elemento ao container Game
        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoTexto)

        // Ao pressionar Esc voltar para a exposicao 
        this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.Esc){
                engine.goToScene("exposicao")
            }
        })

        // Criar actor para receber a imagem 
        this.actorEmpresa = new Actor ({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })
        
        let ImagemEmpresa1 = Resources.Npc1.toSprite()
        let ImagemEmpresa2 = Resources.Npc2.toSprite()
        let ImagemEmpresa3 = Resources.Npc3.toSprite()
        
        this.listaImagem = [ImagemEmpresa1, ImagemEmpresa2, ImagemEmpresa3]
       
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // faz com que a caixa apareca 
        this.elementoTexto!.style.opacity = "1"
        
        // Pegar dados das cenas passadas 
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);
        

        // Se for a mesa A 
        if (this.objetoInteracao.nomeDaMesa ==  "mesa_strand_a") {
            this.textoDaCena = "Essa é a descrição do case a"

        // Mesa A detectada
        this.elementoTexto!.innerHTML = `<h2> Case 1<h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`


        // Inserir o sprite 
        this.actorEmpresa?.graphics.add(this.listaImagem![0])

        // MUdar zoom
        this.actorEmpresa!.graphics.current!.scale =  vec(1.9, 1.9)
        
    }
    
    
    if (this.objetoInteracao.nomeDaMesa==  "mesa_strand_b") {
            this.textoDaCena = "Essa é a descrição do case b"
        
        this.elementoTexto!.innerHTML = `<h2> Case 2 <h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        
        // Inserir o sprite 
        this.actorEmpresa?.graphics.add(this.listaImagem![1])

        // MUdar zoom
        this.actorEmpresa!.graphics.current!.scale =  vec(1.9, 1.9)
           
        }



        if (this.objetoInteracao.nomeDaMesa ==  "mesa_strand_c") {
            this.textoDaCena = "Essa é a descrição do case c"
            this.elementoTexto!.innerHTML = `<h2> Case 3 <h2>
            <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`


            // Inserir o sprite 
        this.actorEmpresa?.graphics.add(this.listaImagem![2])

        // MUdar zoom
        this.actorEmpresa!.graphics.current!.scale =  vec(1.9, 1.9)
        }

        this.add(this.actorEmpresa!)

    }
    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Faz a caixa de texto desaparecer
        this.elementoTexto!.style.opacity= "0"
    }


}