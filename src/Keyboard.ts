export class Keyboard {
    private static _keysPressed: Record<string, boolean> = {}

    private constructor() { }

    public static get keysPressed() { return Keyboard._keysPressed }

    public static initilize() {
        document.addEventListener("keydown", Keyboard.onKeyDown.bind(this))
        document.addEventListener("keyup", Keyboard.onKeyUp.bind(this))
    }

    private static onKeyDown(e: KeyboardEvent) {
        this._keysPressed[e.key] = true
    }

    private static onKeyUp(e: KeyboardEvent) {
        this._keysPressed[e.key] = false
    }

    public static reset() {
        this._keysPressed = {}
    }
}