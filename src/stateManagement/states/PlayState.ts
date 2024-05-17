import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { PlayScene, scoring } from "../../scenes";
import { Manager } from "../../Manager";
import { StateMachine } from "../StateMachine";

export class PlayState implements IState {
    private playScene!: PlayScene

    public enter() {
        scoring.score = 0
        this.playScene = new PlayScene()
        Manager.changeScene(this.playScene)
    }

    public exit() {
        this.playScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (!this.playScene.assetsReady) return
        this.playScene.update(ticker)

        if (this.playScene.pipeManager.collides(this.playScene.bird)) {
            this.playScene.explosionSound.play()
            this.playScene.hurtSound.play()
            StateMachine.change("score")
        }
    }

}