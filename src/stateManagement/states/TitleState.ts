import { Ticker } from "pixi.js";
import { IState } from "./BaseState";
import { TitleScene } from "../../scenes";
import { Manager } from "../../Manager";
import { Keyboard } from "../../Keyboard";
import { StateMachine } from "../StateMachine";

export class TitleState implements IState {
    private titleScene!: TitleScene

    public enter() {
        this.titleScene = new TitleScene()
        Manager.changeScene(this.titleScene)
    }

    public exit() {
        this.titleScene.destroyAssets()
    }

    public update(ticker: Ticker) {
        if (!this.titleScene.assetsReady) return
        this.titleScene.update(ticker)

        if (Keyboard.keysPressed["Enter"]) {
            StateMachine.change("count-down")
        }

    }

}