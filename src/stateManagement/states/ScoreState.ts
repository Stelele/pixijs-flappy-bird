import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { Keyboard } from "../../Keyboard";
import { StateMachine } from "../StateMachine";
import { ScoreScene } from "../../scenes";
import { Manager } from "../../Manager";

export class ScoreState implements IState {
    private scoreScene!: ScoreScene

    public enter() {
        this.scoreScene = new ScoreScene()
        Manager.changeScene(this.scoreScene)
    }

    public exit() {
        this.scoreScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (this.scoreScene.assetsReady) {
            this.scoreScene.update(ticker)
        }

        if (Keyboard.keysPressed["Enter"]) {
            StateMachine.change("count-down")
        }

        if (Keyboard.keysPressed["Escape"]) {
            StateMachine.change("title")
        }
    }
}