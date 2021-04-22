import { say } from "./commands/say";
import { end } from "./commands/end";
import { setChar } from "./commands/setChar";
import { wait } from "./commands/wait";
import { setBg } from "./commands/setbg";

const commandDictionary = {
    say: say,
    end: end,
    setchar: setChar,
    wait: wait,
    setbg: setBg,
};

export function matchCommand(command) {
    const commandFunction = commandDictionary[command.name];
    if (!commandFunction) {
        console.error(`Invalid XVN Command: ${command.name}`);
    }
    commandFunction(command.args);
}
