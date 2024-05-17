import { BitmapText, Container, Ticker } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { flappyFont, mediumFont } from "../graphics";

export class TitleScene extends Container implements IScene {
    public assetBundles = ["fonts"]
    public assetsReady: boolean;

    private titleMessage!: BitmapText
    private hintMessage!: BitmapText

    constructor() {
        super()
        this.assetsReady = false
    }

    public destroyAssets(): void {
        this.removeChild(this.titleMessage, this.hintMessage)
        this.titleMessage.destroy()
        this.hintMessage.destroy()
    }

    public constructorWithAssets(): void {
        this.titleMessage = new BitmapText({ text: "Fifty Bird", style: flappyFont() })
        this.titleMessage.x = (Manager.width / 2) - (this.titleMessage.width / 2)
        this.titleMessage.y = 64
        this.addChild(this.titleMessage)

        this.hintMessage = new BitmapText({ text: "Press Enter", style: mediumFont() })
        this.hintMessage.x = (Manager.width / 2) - (this.hintMessage.width / 2)
        this.hintMessage.y = this.titleMessage.y + this.titleMessage.height + 10
        this.addChild(this.hintMessage)
        this.assetsReady = true
    }

    public update(_ticker: Ticker): void {
    }

}