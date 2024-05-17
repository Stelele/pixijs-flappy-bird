import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { CountDownScene } from "../../scenes/CountDownScene";
import { Manager } from "../../Manager";
import { StateMachine } from "../StateMachine";

export class CountDownState implements IState {
    private countDownScene!: CountDownScene

    public enter() {
        this.countDownScene = new CountDownScene()
        Manager.changeScene(this.countDownScene)
    }

    public exit() {
        this.countDownScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (!this.countDownScene.assetsReady) return

        this.countDownScene.update(ticker)
        if (this.countDownScene.timerDone) {
            StateMachine.change("play")
        }
    }

}