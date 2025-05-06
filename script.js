const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Sir...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing Nova...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function calculate(msg) {
    try {
        msg = msg.replace(/plus/g, "+")
                 .replace(/minus/g, "-")
                 .replace(/into|multiply|times/g, "*")
                 .replace(/divide|by/g, "/");
        const result = eval(msg);
        speak(`The result is ${result}`);
    } catch {
        speak("Sorry, I couldn't calculate that.");
    }
}

function toggleTheme(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark-mode");
        speak("Dark mode activated.");
    } else if (mode === "light") {
        document.body.classList.remove("dark-mode");
        speak("Light mode activated.");
    }
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Jitendra, How Can I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("tell something about me")) {
        speak("Your Name is Jitendra");
    } else if (message.includes('thank you') || message.includes('thanks')) {
        speak("You are Welcome");
    } else if (message.includes("open whatsapp")) {
        window.open("https://whatsapp.com", "_blank");
        speak("Opening Whatsapp...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator') || message.includes('plus') || message.includes('minus') || message.includes('divide') || message.includes('multiply')) {
        calculate(message);
    } else if (message.includes("dark mode")) {
        toggleTheme("dark");
    } else if (message.includes("light mode")) {
        toggleTheme("light");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}
