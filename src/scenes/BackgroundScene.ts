import { Container, Ticker } from "pixi.js";
import { IScene } from "../Manager";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { GroundGraphic } from "../graphics";
import { Sound } from "@pixi/sound";

export class BackgroundScene extends Container implements IScene {
    public assetBundles: string[] = ["background-scene", "background-music"]
    public assetsReady: boolean;

    private background!: BackgroundGraphic;
    private ground!: GroundGraphic
    private music!: Sound

    constructor() {
        super()
        this.assetsReady = false
    }

    public destroyAssets(): void {
        this.removeChild(this.background, this.ground)
        this.background.destroy()
        this.ground.destroy()
    }

    public constructorWithAssets(): void {
        this.background = new BackgroundGraphic()
        this.ground = new GroundGraphic()
        this.addChild(this.background, this.ground)
        this.music = Sound.from("sounds/music.mp3")
        this.music.play({ loop: true })
        this.assetsReady = true
    }


    public update(ticker: Ticker): void {
        this.background.update(ticker)
        this.ground.update(ticker)
    }

}