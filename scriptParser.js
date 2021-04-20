var commands = [];

var currentCommand = -1;
var isMessageAnimating = false;
var isWaiting = false;

function playNextCommand() {
    currentCommand++;

    var command = commands[currentCommand];
    if (command.name === "say") {
        say(command.args[0]);
    } else if (command.name === "wait") {
        wait(command.args[0]);
    } else if (command.name === "setchar") {
        setChar(command.args[0]);
    } else if (command.name === "end") {
        end();
    }
}

function setChar(filename) {
    var char1Element = document.getElementById("char1");
    char1Element.src = `assets/${filename}`;
    char1Element.className = "in";
    playNextCommand();
}

function end() {
    // it's over...
}

function clickOnScreen() {
    if (isMessageAnimating || isWaiting) {
        return;
    }
    clearText();
    playNextCommand();
}

function wait(rawAmount) {
    amount = parseFloat(rawAmount) * 1000;
    isWaiting = true;
    setTimeout(() => {
        isWaiting = false;
        playNextCommand();
    }, amount);
}

function say(text) {
    var i = 0;
    var textSpeed = 20;
    isMessageAnimating = true;
    function typeWriter(text) {
        var addedTextSpeed = 0;
        if (i < text.length) {
            if (text.charAt(i) === `\\` && text.charAt(i + 1) === `.`) {
                i += 2;
                addedTextSpeed = textSpeed * 15;
            }
            document.getElementById("text-area").innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(text), textSpeed + addedTextSpeed);
        } else {
            isMessageAnimating = false;
        }
    }
    typeWriter(text);
}

function clearText() {
    document.getElementById("text-area").innerHTML = "";
}

function loadScriptArray(rawText) {
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

// Start game
if (currentCommand == -1) {
    fetch("scripts/sample.xvn")
        .then((response) => response.text())
        .then((rawText) => loadScriptArray(rawText));
}
