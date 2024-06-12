import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";


export class Player extends Actor {
    // Propriedade do player 
    private velocidade: number = 180

    // Configuração do player 
    constructor() {
        super({
            pos: vec(600, 500),
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        });

    }

    onInitialize(engine: Engine<any>): void {
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
