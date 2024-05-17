import { AssetsManifest } from "pixi.js"

export const manifest: AssetsManifest = {
    bundles: [
        {
            name: "background-scene",
            assets: {
                "background": "images/background.png",
                "ground": "images/ground.png",

            }
        },
        {
            name: "background-music",
            assets: [
                //https://freesound.org/people/xsgianni/sounds/388079/
                { alias: "music", src: "sounds/music.mp3" }
            ]
        },
        {
            name: "play-scene",
            assets: {
                "bird": "images/bird.png",
                "pipe": "images/pipe.png",
                "explosion": "sounds/explosion.wav",
                "hurt": "sounds/hurt.wav",
                "jump": "sounds/jump.wav",
                //https://freesound.org/people/rigor789/sounds/341979/
                "score": 'sounds/score.wav'
            }
        },
        {
            name: "fonts",
            assets: [
                { alias: "Flappy", src: "fonts/flappy.ttf" },
                { alias: "Font", src: "fonts/font.ttf" }
            ]
        }
    ]
}