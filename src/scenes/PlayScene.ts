import { Container, Ticker, Text } from "pixi.js";
import { IScene } from "../Manager";
import { BirdSprite, PipeManager } from "../sprites";
import { mediumFont } from "../graphics";
import { Sound } from "@pixi/sound";

export const scoring = { score: 0 }

export class PlayScene extends Container implements IScene {
    public assetBundles: string[] = ["play-scene"]
    public assetsReady: boolean;

    private _bird!: BirdSprite
    private _pipeManager!: PipeManager
    private _scoreText!: Text
    private _coinSound!: Sound
    public explosionSound!: Sound
    public hurtSound!: Sound

    constructor() {
        super()
        this.sortableChildren = true
        this.assetsReady = false
    }

    public destroyAssets() {
        this.removeChild(this._bird)
        this.bird.destroy()
        this._pipeManager.destroy()
    }

    public get bird() { return this._bird }
    public get pipeManager() { return this._pipeManager }

    public constructorWithAssets(): void {
        this._bird = new BirdSprite()
        this.addChild(this._bird)

        this._scoreText = new Text({ text: `Score: ${scoring.score}`, style: mediumFont() })
        this._scoreText.x = 10
        this._scoreText.y = 10
        this._scoreText.zIndex = 100
        this.addChild(this._scoreText)

        this._coinSound = Sound.from("sounds/score.wav")
        this.explosionSound = Sound.from("sounds/explosion.wav")
        this.hurtSound = Sound.from("sounds/hurt.wav")

        this._pipeManager = new PipeManager(this)
        this.assetsReady = true
    }

    public update(ticker: Ticker): void {
        this._bird.update(ticker)
        this._pipeManager.update(ticker)

        for (const pipe of this._pipeManager.pipes) {
            const passedBird = pipe.x + pipe.width < this._bird.x
            if (passedBird && !pipe.hasScored) {
                scoring.score += 1
                pipe.hasScored = true
                this._coinSound.play()
            }
        }

        this._scoreText.text = `Score: ${scoring.score}`
    }
}