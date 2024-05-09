import { Application, Assets, Container, Ticker } from "pixi.js";
import { WelcomeScene } from "./scenes";
import { manifest } from "./Manifest";

export class Manager {
    private constructor() { }

    // Safely store variables for our game
    private static app: Application;
    private static currentScene: IScene;

    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;


    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    private static initializeAssetsPromise: Promise<unknown>;

    // Use this function ONCE to start the entire machinery
    public static async initialize(width: number, height: number, background: number): Promise<void> {
        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new Application();
        await Manager.app.init({
            canvas: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        })

        Manager.initializeAssetsPromise = Assets.init({ manifest: manifest });

        // Black js magic to extract the bundle names into an array.
        const bundleNames = manifest.bundles.map(b => b.name);

        // Initialize the assets and then start downloading the bundles in the background
        Manager.initializeAssetsPromise.then(() => Assets.backgroundLoadBundle(bundleNames));

        // Add the ticker
        Manager.app.ticker.add(Manager.update)

        window.addEventListener("resize", Manager.resize)
        Manager.resize()

        Manager.changeScene(new WelcomeScene())
    }

    // Call this function when you want to go to a new scene
    public static async changeScene(newScene: IScene) {
        await Manager.initializeAssetsPromise
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        await Assets.loadBundle(newScene.assetBundles)
        newScene.constructorWithAssets()

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(ticker: Ticker): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(ticker);
        }

    }

    private static resize() {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        Manager.app.canvas.style.width = `${enlargedWidth}px`;
        Manager.app.canvas.style.height = `${enlargedHeight}px`;
        Manager.app.canvas.style.marginLeft = Manager.app.canvas.style.marginRight = `${horizontalMargin}px`;
        Manager.app.canvas.style.marginTop = Manager.app.canvas.style.marginBottom = `${verticalMargin}px`;
    }
}

export interface IScene extends Container {
    assetBundles: string[]
    constructorWithAssets(): void
    update(ticker: Ticker): void;
}

export interface IGraphics {
    update(ticker: Ticker): void;
}