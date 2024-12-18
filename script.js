const titleText = "deity";
let titleIndex = 0;
let isTyping = true;

function typeTitle() {
    if (isTyping) {
        if (titleIndex < titleText.length) {
            document.title = titleText.substring(0, titleIndex + 1) + "_";
            titleIndex++;
            setTimeout(typeTitle, 300);
        } else {
            isTyping = false;
            setTimeout(typeTitle, 1000);
        }
    } else {
        if (titleIndex > 0) {
            document.title = titleText.substring(0, titleIndex) + "_";
            titleIndex--;
            setTimeout(typeTitle, 100);
        } else {
            isTyping = true;
            setTimeout(typeTitle, 500);
        }
    }
}

typeTitle();
