import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { IGraphics, Manager } from "../Manager";
import { randomInt } from "../helpers";

export class PipeSprite implements IGraphics {
    private static pipeTexture: Texture
    private readonly SCROLL_SPEED = -0.06
    private readonly PIPE_GAPE = 90

    private readonly container: Container
    private upperPipe: Sprite
    private lowerPipe: Sprite

    public shouldDestroy = false

    constructor(container: Container) {
        if (!PipeSprite.pipeTexture) {
            PipeSprite.pipeTexture = Texture.from("pipe")
        }

        this.container = container

        this.lowerPipe = new Sprite(PipeSprite.pipeTexture)
        this.lowerPipe.x = Manager.width
        this.lowerPipe.y = randomInt(Manager.height - 50, this.PIPE_GAPE + 20)
        this.container.addChild(this.lowerPipe)

        this.upperPipe = new Sprite(PipeSprite.pipeTexture)
        this.upperPipe.scale.y *= -1
        this.upperPipe.x = Manager.width
        this.upperPipe.y = this.lowerPipe.y - this.PIPE_GAPE
        this.container.addChild(this.upperPipe)
    }


    public update(ticker: Ticker): void {
        const scroll = this.SCROLL_SPEED * ticker.deltaMS
        this.upperPipe.position.x += scroll
        this.lowerPipe.position.x += scroll

        if (this.lowerPipe.x <= -this.lowerPipe.width) {
            this.shouldDestroy = true
        }
    }

    public destroy() {
        this.container.removeChild(this.upperPipe, this.lowerPipe)
        this.upperPipe.destroy()
        this.lowerPipe.destroy()
    }

}