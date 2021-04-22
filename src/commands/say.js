export function say(args) {
    const text = args[0];
    let i = 0;
    const textSpeed = 20;
    window.isMessageAnimating = true;
    function typeWriter(text) {
        let addedTextSpeed = 0;
        if (i < text.length) {
            if (text.charAt(i) === `\\` && text.charAt(i + 1) === `.`) {
                i += 2;
                addedTextSpeed = textSpeed * 15;
            }
            document.getElementById("text-area").innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(text), textSpeed + addedTextSpeed);
        } else {
            window.isMessageAnimating = false;
        }
    }
    typeWriter(text);
}
