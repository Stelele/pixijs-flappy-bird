import { Container, Ticker } from "pixi.js";
import { PipeSprite } from "./PipeSprite";
import { IGraphics } from "../Manager";

export class PipeManager implements IGraphics {
    private pipes: PipeSprite[]
    private spawnTimer: number
    private readonly container: Container

    constructor(container: Container) {
        this.container = container
        this.spawnTimer = 0
        this.pipes = []
    }

    public update(ticker: Ticker): void {
        this.spawnTimer += ticker.deltaMS

        if (this.spawnTimer >= 2500) {
            const newPipe = new PipeSprite(this.container)
            this.pipes.push(newPipe)
            this.spawnTimer = 0
        }

        for (const pipe of this.pipes) {
            pipe.update(ticker)
        }

        const pipesToDestroy = this.pipes.filter((pipe) => pipe.shouldDestroy)
        for (const pipe of pipesToDestroy) {
            pipe.destroy()
        }

        this.pipes = this.pipes.filter((pipe) => !pipe.shouldDestroy)
    }
}