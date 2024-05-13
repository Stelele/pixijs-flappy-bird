import { Container, Ticker } from "pixi.js";
import { IScene } from "../Manager";
import { BirdSprite, PipeManager } from "../sprites";

export class PlayScene extends Container implements IScene {
    public assetBundles: string[] = ["play-scene"]

    private bird!: BirdSprite
    private pipeManager!: PipeManager
    constructor() {
        super()
    }

    public constructorWithAssets(): void {
        this.bird = new BirdSprite()
        this.addChild(this.bird)

        this.pipeManager = new PipeManager(this)
    }

    public update(ticker: Ticker): void {
        this.bird.update(ticker)
        this.pipeManager.update(ticker)
    }

}