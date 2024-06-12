import { Actor, CollisionType, Color, Engine, FadeInOut, Resource, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/Player.1";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        // Carregar o mapa 
        let tiledMap = Resources.Mapa

        // Defini offset para redetização do mapa
        let offsetX = 138
        let offsetY = 100

        // Adicionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),
        }) 

        // Definir zoom da camera para aumentar um pouco a vizualização
        this.camera.zoom = 1.2
        
        // Criação e configuração do player 
        let Jogador = new Player()

        // Define z=index do player ,ultil se algum outro elemento ficar "por cima" 
        Jogador.z = 10

        // adicionar player na cena 
        this.add(Jogador)

        // Adiconar colisao com cada objeto 
        // Pegar a camada de objeto colisores 
        let camadaObjetosColisores =tiledMap.getObjectLayers("objetosColisores") [0]

        console.log(camadaObjetosColisores);

        // Percorer os objetos com foreach e para cada camadaObjetosColisores, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor ({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! /2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
                
            })
            // Adicoonar o colisor do objeto na cena 
            this.add(objetoAtual)
        })
    }

}
