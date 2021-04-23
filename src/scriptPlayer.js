import { matchCommand } from "./commandParser";

var commands = [];
var currentCommand = -1;
var isMessageAnimating = false;

export function playNextCommand() {
    currentCommand++;

    var command = commands[currentCommand];
    matchCommand(command);
}

function end() {
    // it's over...
}

export function clickOnScreen() {
    if (window.isMessageAnimating || window.isWaiting) {
        return;
    }
    clearCharAnimation();
    clearText();
    playNextCommand();
}

function clearCharAnimation() {
    clearInterval(window.setCharAnimatedInterval);
}

function clearText() {
    document.getElementById("text-area").innerHTML = "";
}

export function loadScriptArray(rawText) {
    var lines = rawText.split("\n").filter((line) => line.length > 1);
    commands = lines.map((line) => {
        var commandName = line.split(" ")[0];
        var rawArgs = line.slice(commandName.length + 1, line.length);
        var args = rawArgs.match(/"(.*?)"/gm);
        if (!args) return;
        var parsedArgs = args.map((arg) => arg.slice(1, arg.length - 1));
        return {
            name: commandName,
            args: parsedArgs,
        };
    });

    playNextCommand();
}
