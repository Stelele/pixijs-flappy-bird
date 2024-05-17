import { Container, Text, Ticker } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { hugeFont, mediumFont } from "../graphics";

export class CountDownScene extends Container implements IScene {
    public assetBundles = ["fonts"]
    public assetsReady: boolean;

    private countDownText!: Text
    private helperText!: Text
    private timer!: number
    public timerDone!: boolean

    constructor() {
        super()
        this.assetsReady = false
    }

    constructorWithAssets(): void {
        this.countDownText = new Text({ text: "3", style: hugeFont() })
        this.countDownText.x = (Manager.width / 2) - (this.countDownText.width / 2)
        this.countDownText.y = (Manager.height / 2) - (this.countDownText.height / 2)
        this.addChild(this.countDownText)

        this.helperText = new Text({ text: "Press space to jump", style: mediumFont() })
        this.helperText.x = (Manager.width / 2) - (this.helperText.width / 2)
        this.helperText.y = this.countDownText.y - 50
        this.addChild(this.helperText)

        this.timer = 3000
        this.timerDone = false
        this.assetsReady = true
    }

    update(ticker: Ticker): void {
        this.timer -= ticker.deltaMS
        this.countDownText.text = `${Math.ceil(this.timer / 1000)}`

        if (this.timer <= 0) {
            this.timerDone = true
        }
    }

    destroyAssets(): void {
        this.removeChild(this.countDownText, this.helperText)
        this.countDownText.destroy()
        this.helperText.destroy()
    }

}