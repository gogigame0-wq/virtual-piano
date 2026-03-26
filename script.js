// script.js

// Piano functionality
const pianoKeys = document.querySelectorAll('.piano-key');

function playNote(note) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.play();
}

pianoKeys.forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        playNote(note);
    });
});

// Sound generation
const synth = new Tone.Synth().toDestination();

function synthesize(note) {
    synth.triggerAttackRelease(note, "8n");
}

// Recording feature
let recording = [];
let isRecording = false;

function toggleRecording() {
    isRecording = !isRecording;
    if (isRecording) {
        recording = [];
        console.log('Recording started...');
    } else {
        console.log('Recording stopped:', recording);
    }
}

pianoKeys.forEach(key => {
    key.addEventListener('click', () => {
        const note = key.dataset.note;
        if (isRecording) {
            recording.push(note);
        }
        synthesize(note);
    });
});

// Add a button to toggle recording
const recordButton = document.createElement('button');
recordButton.innerText = 'Toggle Recording';
recordButton.addEventListener('click', toggleRecording);
document.body.appendChild(recordButton);