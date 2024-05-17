import { Container, Text, Ticker } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { flappyFont, mediumFont } from "../graphics";
import { scoring } from "./PlayScene";

export class ScoreScene extends Container implements IScene {
    public assetBundles = ["fonts"]
    public assetsReady!: boolean

    private lossText!: Text
    private scoreText!: Text
    private hintText!: Text

    constructor() {
        super()
        this.assetsReady = false
    }

    public constructorWithAssets(): void {
        this.lossText = new Text({ text: 'Oof! You lost!', style: flappyFont() })
        this.lossText.anchor.set(0.5)
        this.lossText.x = (Manager.width / 2)
        this.lossText.y = 64
        this.addChild(this.lossText)

        this.scoreText = new Text({ text: `Score: ${scoring.score}`, style: mediumFont() })
        this.scoreText.anchor.set(0.5)
        this.scoreText.x = Manager.width / 2
        this.scoreText.y = this.lossText.y + this.lossText.height + 20
        this.addChild(this.scoreText)

        this.hintText = new Text({ text: 'Press Enter to Play Again!', style: mediumFont() })
        this.hintText.anchor.set(0.5)
        this.hintText.x = Manager.width / 2
        this.hintText.y = this.scoreText.y + this.scoreText.height + 20
        this.addChild(this.hintText)

        this.assetsReady = true
    }

    public update(_ticker: Ticker): void { }

    public destroyAssets(): void {
        this.removeChild(this.scoreText, this.lossText, this.hintText)
        this.scoreText.destroy()
        this.lossText.destroy()
        this.hintText.destroy()
    }

}