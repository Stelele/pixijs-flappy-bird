import { Container, Ticker } from "pixi.js";
import { IScene } from "../Manager";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { GroundGraphic } from "../graphics";

export class BackgroundScene extends Container implements IScene {

    public assetBundles: string[] = ["background-scene"]
    private background!: BackgroundGraphic;
    private ground!: GroundGraphic

    constructor() {
        super()
    }

    public constructorWithAssets(): void {
        this.background = new BackgroundGraphic()
        this.ground = new GroundGraphic()
        this.addChild(this.background, this.ground)
    }


    public update(ticker: Ticker): void {
        this.background.update(ticker)
        this.ground.update(ticker)
    }

}