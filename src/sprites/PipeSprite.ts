import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { IGraphics, Manager } from "../Manager";
import { randomInt } from "../helpers";
import { BirdSprite } from "./BirdSprite";

export class PipeSprite implements IGraphics {
    private static pipeTexture: Texture
    private readonly SCROLL_SPEED = -0.06
    private readonly PIPE_GAPE = 90

    private readonly container: Container
    private upperPipe: Sprite
    private lowerPipe: Sprite

    public shouldDestroy = false
    public hasScored = false
    public get x() { return this.upperPipe.x }
    public get width() { return this.upperPipe.width }

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

    public collides(bird: BirdSprite) {
        return this.isUpperCollision(bird) || this.isLowerCollision(bird)
    }

    private isUpperCollision(bird: BirdSprite) {
        if (this.upperPipe.x > bird.x + bird.width - 13) return false
        if (bird.x + 5 > this.upperPipe.x + this.upperPipe.width) return false
        if (this.upperPipe.y < bird.y + 5) return false
        if (bird.y + 5 < this.upperPipe.y - this.upperPipe.height) return false
        return true
    }

    private isLowerCollision(bird: BirdSprite) {
        if (this.lowerPipe.x > bird.x + bird.width - 13) return false
        if (bird.x + 5 > this.lowerPipe.x + this.lowerPipe.width) return false
        if (this.lowerPipe.y > bird.y + bird.height - 5) return false
        if (bird.y - 5 > this.lowerPipe.y + this.lowerPipe.height) return false
        return true
    }
}