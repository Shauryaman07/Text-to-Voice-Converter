document.addEventListener('DOMContentLoaded', () => {
    let speech = new SpeechSynthesisUtterance();
    let voices = [];
    let voiceSelect = document.querySelector("select");
    let button = document.querySelector("button");
    let textarea = document.querySelector("textarea");

    // Function to initialize speech synthesis after voices are loaded
    function initializeSpeechSynthesis() {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            speech.voice = voices[0]; // Set default voice initially

            // Populate the voice options in the select dropdown
            voices.forEach((voice, i) => {
                voiceSelect.options[i] = new Option(voice.name, i);
            });

            // Event listener for voice selection change
            voiceSelect.addEventListener("change", () => {
                speech.voice = voices[voiceSelect.value];
            });

            // Event listener for button click to speak the text from textarea
            button.addEventListener("click", () => {
                if (textarea.value.trim() !== '') {
                    speech.text = textarea.value;
                    window.speechSynthesis.speak(speech);
                } else {
                    console.log("Textarea is empty. Please enter text.");
                }
            });
        } else {
            console.error("No voices available.");
        }
    }

    // Check if voices are already loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = initializeSpeechSynthesis;
    } else {
        // Fallback for browsers that do not support onvoiceschanged
        initializeSpeechSynthesis();
    }
});
