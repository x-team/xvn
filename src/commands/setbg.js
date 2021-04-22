import { playNextCommand } from "../scriptPlayer";
import gifAssets from "../../assets/*.gif";

export function setBg(args) {
    const filename = args[0].slice(0, -4); // remove extension

    const artArea = document.getElementById("art-area");
    const filepath = gifAssets[filename];
    artArea.style.backgroundImage = `url('${filepath}')`;
    playNextCommand();
}
