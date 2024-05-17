import { Container, Ticker } from "pixi.js";
import { PipeSprite } from "./PipeSprite";
import { IGraphics } from "../Manager";
import { BirdSprite } from "./BirdSprite";

export class PipeManager implements IGraphics {
    private _pipes: PipeSprite[]
    private spawnTimer: number
    private readonly container: Container

    constructor(container: Container) {
        this.container = container
        this.spawnTimer = 0
        this._pipes = []
    }

    public get pipes() { return this._pipes }

    public destroy() {
        for (const pipe of this._pipes) {
            pipe.destroy()
        }
    }

    public update(ticker: Ticker): void {
        this.spawnTimer += ticker.deltaMS

        if (this.spawnTimer >= 2500) {
            const newPipe = new PipeSprite(this.container)
            this._pipes.push(newPipe)
            this.spawnTimer = 0
        }

        for (const pipe of this._pipes) {
            pipe.update(ticker)
        }

        const pipesToDestroy = this._pipes.filter((pipe) => pipe.shouldDestroy)
        for (const pipe of pipesToDestroy) {
            pipe.destroy()
        }

        this._pipes = this._pipes.filter((pipe) => !pipe.shouldDestroy)
    }

    public collides(bird: BirdSprite) {
        for (const pipe of this._pipes) {
            const isCollision = pipe.collides(bird)
            if (isCollision) { return true }
        }

        return false
    }
}