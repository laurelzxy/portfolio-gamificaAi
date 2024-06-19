import { Actor, CollisionType, Color, Engine, FadeInOut, Resource, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/Player.1";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // ativar o modo de Debug 
        engine.toggleDebug()

        // Carregar musica
        let musicaFundo = Resources.RitmadaBGM

        // Configurar musicas para executar 
        musicaFundo.loop = true
        musicaFundo.play(0.5)

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
        this.camera.zoom = 1.1

        // Carregar spawn point do jogador 
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do player 
        let Jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        // Define z=index do player ,ultil se algum outro elemento ficar "por cima" 
        Jogador.z = 3

        // adicionar player na cena 
        this.add(Jogador)

        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // Configurar NPCs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.fromRGB(67, 187, 243),
            "NpcA"
        )
        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            Color.fromRGB(4, 227, 84),
            "NpcB"
        )
        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            Color.fromRGB(246, 136, 19),
            "NpcC"
        )

        // Adicionar os Npcs 
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Focar a camera na cena 
        this.camera.strategy.lockToActor(Jogador)
        this.camera.zoom = 2

        // Adiconar colisao com cada objeto 
        // Pegar a camada de objeto colisores 
        let camadaObjetosColisores = tiledMap.getObjectLayers("objetosColisores")[0]

        console.log(camadaObjetosColisores);

        // Percorer os objetos com foreach e para cada camadaObjetosColisores, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,

            })
            // Adicoonar o colisor do objeto na cena 
            this.add(objetoAtual)
        })
    }

}
