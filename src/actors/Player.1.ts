import { Actor, Animation, CollisionType, Color, Engine, Keys, Resource, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";


export class Player extends Actor {
    // Propriedade do player 
    private velocidade: number = 180

    // Configuração do player 
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
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
                    y: 4

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

        this.graphics.use("left-idle")





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
                    break;

                case Keys.Right:
                case Keys.D:
                    //  mover para a direita 
                    //Define a velocidade x para negativa que significa movimentar o player para a esquerda
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    // Mover para cima

                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    // Mover para baixo 
                    // Define a velocidade y para positiva, que significa 
                    // movimentar o player para baixo 
                    this.vel.y = this.velocidade
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
        })

    }



}
