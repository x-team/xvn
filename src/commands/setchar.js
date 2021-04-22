import { playNextCommand } from "../scriptPlayer";
import pngAssets from "../../assets/*.png";

export function setChar(args) {
    const filename = args[0].slice(0, -4); // remove extension

    const char1Element = document.getElementById("char1");
    char1Element.src = pngAssets[filename];
    char1Element.className = "in";
    playNextCommand();
}
