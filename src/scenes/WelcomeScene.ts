import { Container, Ticker } from "pixi.js";
import { IScene } from "../Manager";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";

export class WelcomeScene extends Container implements IScene {

    public assetBundles: string[] = ["welcome"]
    private background!: BackgroundGraphic;

    constructor() {
        super()
    }

    public constructorWithAssets(): void {
        this.background = new BackgroundGraphic()
        this.addChild(this.background)
    }


    public update(ticker: Ticker): void {
        this.background.update(ticker)
    }

}