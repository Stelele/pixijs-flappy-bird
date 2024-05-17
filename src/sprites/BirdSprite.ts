import { Sprite, Texture, Ticker } from "pixi.js";
import { IGraphics, Manager } from "../Manager";
import { Keyboard } from "../Keyboard";
import { Sound } from "@pixi/sound";

export class BirdSprite extends Sprite implements IGraphics {
    private GRAVITY = 0.02

    private dy: number
    private jumpSound: Sound
    constructor() {
        super(Texture.from("bird"))
        this.x = (Manager.width / 2) - (this.width / 2)
        this.y = (Manager.height / 2) - (this.height / 2)
        this.dy = 0
        this.jumpSound = Sound.from("sounds/jump.wav")
    }

    update(ticker: Ticker): void {
        this.dy += this.GRAVITY * ticker.deltaMS

        if (Keyboard.keysPressed[" "]) {
            this.dy = -5
            this.jumpSound.play()
        }

        this.position.y = Math.max(Math.min(this.position.y + this.dy, Manager.height - 50), 0)
    }

}