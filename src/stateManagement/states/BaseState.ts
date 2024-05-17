import { Ticker } from "pixi.js";

export interface IState {
    enter: () => void
    exit: () => void
    update: (ticker: Ticker) => void
}