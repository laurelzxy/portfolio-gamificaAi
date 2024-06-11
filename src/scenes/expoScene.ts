import { Color, Engine, FadeInOut, Resource, Scene, Transition, vec } from "excalibur";
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
        Jogador.z = 1

        // adicionar player na cena 
        this.add(Jogador)
    }

}
