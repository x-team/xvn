import { clickOnScreen, loadScriptArray } from "./scriptPlayer";
import script from "../scripts/script.txt";

window.clickOnScreen = clickOnScreen;

// Start game
loadScriptArray(script);
/* fetch("scripts/sample.xvn")
    .then((response) => response.text())
    .then((rawText) => loadScriptArray(rawText)); */
