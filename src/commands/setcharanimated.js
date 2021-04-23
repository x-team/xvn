import { playNextCommand } from "../scriptPlayer";
import pngAssets from "../../assets/*.png";

export function setCharAnimated(args) {
    const baseFilename = args[0].slice(0, -4); // remove extension
    const durationBetweenFrames = parseFloat(args[1]) || 0.25;
    const loops = args[2] || 1;

    const files = [];
    Object.keys(pngAssets).forEach((assetKey) => {
        if (assetKey.startsWith(baseFilename)) {
            files.push(pngAssets[assetKey]);
        }
    });

    const char1Element = document.getElementById("char1");
    let i = 0;
    let fileCursor = 0;
    window.setCharAnimatedInterval = setInterval(() => {
        const currentAsset = files[fileCursor];
        char1Element.src = currentAsset;
        char1Element.className = "in";
        i++;
        fileCursor++;

        if (fileCursor >= files.length) {
            fileCursor = 0;
        }
        if (i >= loops) {
            clearInterval(setCharAnimatedInterval);
        }
    }, durationBetweenFrames * 1000);

    playNextCommand();
}
