import { playNextCommand } from "../scriptPlayer";

export function wait(args) {
    const rawAmount = parseInt(args[0]);
    const amount = parseFloat(rawAmount) * 1000;
    window.isWaiting = true;
    setTimeout(() => {
        window.isWaiting = false;
        playNextCommand();
    }, amount);
}
