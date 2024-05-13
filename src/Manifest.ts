import { AssetsManifest } from "pixi.js"

export const manifest: AssetsManifest = {
    bundles: [
        {
            name: "background-scene",
            assets: {
                "background": "images/background.png",
                "ground": "images/ground.png"
            }
        },
        {
            name: "play-scene",
            assets: {
                "bird": "images/bird.png",
                "pipe": "images/pipe.png"
            }
        }
    ]
}