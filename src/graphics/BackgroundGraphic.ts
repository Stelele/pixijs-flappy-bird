import { Graphics, Texture, Ticker } from "pixi.js";
import { IGraphics } from "../Manager";

export class BackgroundGraphic extends Graphics implements IGraphics {
    private readonly SCROLL_SPEED = 0.1
    constructor() {
        super()
        this.texture(Texture.from("background"))
        this.x = 0
        this.y = 0

    }

    update(ticker: Ticker): void {
        this.position.x -= ticker.deltaMS * this.SCROLL_SPEED

        if (this.x <= -1280) {
            this.position.x = 0
        }
    }

}