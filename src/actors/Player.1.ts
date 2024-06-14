import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Resource, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";


export class Player extends Actor {
    // Propriedade do player 
    private velocidade: number = 180
    private ultimaDirecao: string = "down" 

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    // Configuração do player 
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 35,
            height: 50,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
            
        });

    }

    onInitialize(engine: Engine<any>): void {

        // configurar sprite do player 
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.playerSpritePath,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns:56,
                rows: 20
            },
            spacing:{
                originOffset:{
                    y: 0

                }
            }
        })

        // Criar as animacoes 
        const duracaoFrameAnimacao = 70
        // animacoes Idle 
        // Idle Esquerda 
        const leftIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 1) },
                { graphic: playerSpriteSheet.getSprite(13, 1) },
                { graphic: playerSpriteSheet.getSprite(14, 1) },
                { graphic: playerSpriteSheet.getSprite(15, 1) },
                { graphic: playerSpriteSheet.getSprite(16, 1) },
                { graphic: playerSpriteSheet.getSprite(17, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-idle", leftIdle)

        // this.graphics.use("left-idle")

        // Idle direita
        const rightIdle = new Animation ({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 1)},
                { graphic: playerSpriteSheet.getSprite(1, 1)},
                { graphic: playerSpriteSheet.getSprite(2, 1)},
                { graphic: playerSpriteSheet.getSprite(3, 1)},
                { graphic: playerSpriteSheet.getSprite(4, 1)},
                { graphic: playerSpriteSheet.getSprite(5, 1)},

            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)

        const upIdle = new Animation ({
            frames: [
                {graphic: playerSpriteSheet.getSprite(6, 1)},
                {graphic: playerSpriteSheet.getSprite(7, 1)},
                {graphic: playerSpriteSheet.getSprite(8, 1)},
                {graphic: playerSpriteSheet.getSprite(9, 1)},
                {graphic: playerSpriteSheet.getSprite(10, 1)},
                {graphic: playerSpriteSheet.getSprite(11, 1)},
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        const downIdle = new Animation ({
            frames: [
                {graphic: playerSpriteSheet.getSprite(18, 1)},
                {graphic: playerSpriteSheet.getSprite(19, 1)},
                {graphic: playerSpriteSheet.getSprite(20, 1)},
                {graphic: playerSpriteSheet.getSprite(21, 1)},
                {graphic: playerSpriteSheet.getSprite(22, 1)},
                {graphic: playerSpriteSheet.getSprite(23, 1)},

            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)

        // Definir aminamcao inicial do player 
        this.graphics.use("down-idle")

        // Definir zoom
        this.graphics.current!.scale = vec(0.9, 0.9)


        // andar esquerda 
        const leftWalk = new Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(12, 2)},
                {graphic: playerSpriteSheet.getSprite(13, 2)},
                {graphic: playerSpriteSheet.getSprite(14, 2)},
                {graphic: playerSpriteSheet.getSprite(15, 2)},
                {graphic: playerSpriteSheet.getSprite(16, 2)},
                {graphic: playerSpriteSheet.getSprite(17, 2)},
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-walk", leftWalk)

        // andar direita 
        const rightWalk = new Animation ({
            frames:[
                {graphic: playerSpriteSheet.getSprite(0, 2)},
                {graphic: playerSpriteSheet.getSprite(1, 2)},
                {graphic: playerSpriteSheet.getSprite(2, 2)},
                {graphic: playerSpriteSheet.getSprite(3, 2)},
                {graphic: playerSpriteSheet.getSprite(4, 2)},
                {graphic: playerSpriteSheet.getSprite(5, 2)}

            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)

        // andar cima
        const upWalk = new Animation ({
            frames:[
                {graphic: playerSpriteSheet.getSprite(6, 2)},
                {graphic: playerSpriteSheet.getSprite(7, 2)},
                {graphic: playerSpriteSheet.getSprite(8, 2)},
                {graphic: playerSpriteSheet.getSprite(9, 2)},
                {graphic: playerSpriteSheet.getSprite(10, 2)},
                {graphic: playerSpriteSheet.getSprite(11, 2)}

            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", upWalk)

        // andar baixo
        const downWalk = new Animation ({
            frames:[
                {graphic: playerSpriteSheet.getSprite(18, 2)},
                {graphic: playerSpriteSheet.getSprite(19, 2)},
                {graphic: playerSpriteSheet.getSprite(20, 2)},
                {graphic: playerSpriteSheet.getSprite(21, 2)},
                {graphic: playerSpriteSheet.getSprite(22, 2)},
                {graphic: playerSpriteSheet.getSprite(23, 2)}

            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", downWalk)


        // let imagemPlayer = playerSpriteSheet.getSprite(3, 0)
        // // imagemPlayer.scale = vec(1.3, 1.3)

        // this.graphics.add(imagemPlayer)

        //Configurar player para monitorar evento "hold" => segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            //Detectar qual tecla esta pressionada 
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para a esquerda
                    //Define a velocidade x para negativa que significa movimentar o player para a esquerda
                    this.vel.x = -this.velocidade;

                    // Definir animacao 
                    this.graphics.use("left-walk")

                    // Guardar ultima direcao 
                    this.ultimaDirecao = "left"
                

                    break;

                case Keys.Right:
                case Keys.D:
                    //  mover para a direita 
                    //Define a velocidade x para negativa que significa movimentar o player para a esquerda
                    this.vel.x = this.velocidade

                    this.graphics.use("right-walk")

                    // Guardar ultima direcao 
                    this.ultimaDirecao = "right"

                    break;

                case Keys.Up:
                case Keys.W:
                    // Mover para cima

                    this.vel.y = -this.velocidade
                    this.graphics.use("up-walk")
                    // Guardar ultima direcao 
                    this.ultimaDirecao = "up"

                    break;

                case Keys.Down:
                case Keys.S:
                    // Mover para baixo 
                    // Define a velocidade y para positiva, que significa 
                    // movimentar o player para baixo 
                    this.vel.y = this.velocidade
                    this.graphics.use("down-walk")
                    // Guardar ultima direcao 
                    this.ultimaDirecao = "down"

                    break;

                default:
                    // Zerar a velocidade do player para a movimentacao 
                    this.vel.x = 0
                    this.vel.y = 0

                    break;
            }
        });

        // Configurar o player para moniotorar o evento "realease"
        engine.input.keyboard.on("release", (event) => {
            // Fazer o player parar ao soltar as teclas de movimentacao 
            // Parar movimentacap lateral ao soltar as teclas de movimentacao lateral 

            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zerar velocidade horizontal 
                this.vel.x = 0
            }
            // Parar movimentacap lateral ao soltar as teclas de movimentacao lateral 
            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down

            ) {
                // Zerar velocidade vertical 
                this.vel.y = 0
            }

            // Ao parar o player , definir animacao idle da ultima direcao 
            if(this.vel.x == 0 && this.vel.y == 0){
                this.graphics.use(this.ultimaDirecao + "-idle")
                // this.graphics.current! = vec(1.6, 1.6)
            }
        })

    }

    
    
    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // console.log(other.owner.name);
        
        // Indicar que tem um objeto proximo 
        this.temObjetoProximo = true

        // Registrar o ultimo objeto colidido 
        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // detevtar se o player esta longe do ultimo objeto colidido 
        if(this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 45) {
            // Marcar que o objeto nao esta proximo 
            this.temObjetoProximo = false

            // console.log("Esta longe");
        }
    }



}
