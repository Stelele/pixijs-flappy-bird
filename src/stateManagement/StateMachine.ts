import { Ticker } from "pixi.js";
import { CountDownState, IState, PlayState, ScoreState } from "./states";
import { TitleState } from "./states/TitleState";

export class StateMachine {
    private static states: Record<string, () => IState> = {
        "play": () => new PlayState(),
        "title": () => new TitleState(),
        "count-down": () => new CountDownState(),
        "score": () => new ScoreState()
    }
    private static currentstate: IState

    public static change(stateName: string) {
        if (!(stateName in this.states)) {
            throw new Error(`Can not change to new state: ${stateName}`)
        }

        if (this.currentstate) {
            this.currentstate.exit()
        }

        this.currentstate = this.states[stateName]()
        this.currentstate.enter()
    }

    public static update(ticker: Ticker) {
        this.currentstate.update(ticker)
    }
}