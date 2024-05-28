// Sample data
const wordsData = [
    {"word": "cognitive", "definition": "the mental action or process of acquiring knowledge and understanding through thought, experience, and the senses.", "example": "Cognitive processes are essential for learning."},
    {"word": "meretricious", "definition": "apparently attractive but having in reality no value or integrity.", "example": "The souvenirs were meretricious, appealing to tourists but lacking authenticity."},
    {"word": "scourge", "definition": "a person or thing that causes great trouble or suffering.", "example": "The scourge of mass unemployment affects many countries."}
];

const standardData = [
    {"Standard": "All The Things You Are", "Bridge": {"notes": ""}, "Composer": "Jerome Kern", "Lyrisist": "Oscar Hammerstein ", "Year": "", "Origin": "", "Type": "", "Of Note": ""},
    {"Standard": "I Thought About You", "Bridge": {"notes": ""}, "Composer": "Jimmy Van Heusen", "Lyrisist": "Johnny Mercer", "Year": "1939", "Origin": "", "Type": "Song", "Of Note": ""},
    {"Standard": "Basin Street Blues", "Bridge": {"notes": ""}, "Composer": "Spencer Williams", "Lyrisist": "", "Year": "1928", "Origin": "", "Type": "Song", "Of Note": ""}
];

// Function to display a random word and definition
function displayRandomWord() {
    const currentDate = new Date().toDateString();
    let currentIndex = parseInt(getCookie('wordIndex'));
    let lastDate = getCookie('lastDate');

    if (!currentIndex || !lastDate || currentDate !== lastDate) {
        currentIndex = Math.floor(Math.random() * wordsData.length);
        setCookie('wordIndex', currentIndex);
        setCookie('lastDate', currentDate);
    }

    const randomWord = wordsData[currentIndex];

    document.getElementById('word').textContent = randomWord.word;
    document.getElementById('definition').textContent = randomWord.definition;
    document.getElementById('example').textContent = `Example: ${randomWord.example}`;
}

// Function to display a random standard
function displayRandomStandard() {
    const currentStandardIndex = parseInt(getCookie('standardIndex'));
    const lastStandardTimestamp = parseInt(getCookie('lastStandardTimestamp')) || 0;
    const currentTimestamp = new Date().getTime();

    if (currentTimestamp > lastStandardTimestamp + 24 * 60 * 60 * 1000) {
        const newStandardIndex = Math.floor(Math.random() * standardData.length);
        setCookie('standardIndex', newStandardIndex);
        setCookie('lastStandardTimestamp', currentTimestamp);

        const randomStandard = standardData[newStandardIndex];

        document.getElementById('standard').textContent = randomStandard.Standard;
        document.getElementById('bridge').textContent = randomStandard.Bridge.notes;
        document.getElementById('composer').textContent = `Composer: ${randomStandard.Composer}`;
        document.getElementById('lyricist').textContent = `Lyricist: ${randomStandard.Lyrisist}`;
        document.getElementById('year').textContent = `Year: ${randomStandard.Year}`;
        document.getElementById('origin').textContent = `Origin: ${randomStandard.Origin}`;
        document.getElementById('type').textContent = `Type: ${randomStandard.Type}`;
        document.getElementById('of-note').textContent = `Of Note: ${randomStandard['Of Note']}`;
    }
}

// Function to add a new word
function addWord() {
    const newWord = document.getElementById('new-word').value;
    const newDefinition = document.getElementById('new-definition').value;
    const newExample = document.getElementById('new-example').value;

    if (newWord && newDefinition && newExample) {
        wordsData.push({word: newWord, definition: newDefinition, example: newExample});
        alert('Word added successfully!');
        document.getElementById('new-word').value = '';
        document.getElementById('new-definition').value = '';
        document.getElementById('new-example').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to add a new standard
function addStandard() {
    const newStandard = document.getElementById('new-standard').value;
    const newBridge = document.getElementById('new-bridge').value;
    const newComposer = document.getElementById('new-composer').value;
    const newLyricist = document.getElementById('new-lyricist').value;
    const newYear = document.getElementById('new-year').value;
    const newOrigin = document.getElementById('new-origin').value;
    const newType = document.getElementById('new-type').value;
    const newOfNote = document.getElementById('new-of-note').value;

    if (newStandard && newComposer) {
        standardData.push({
            Standard: newStandard,
            Bridge: {notes: newBridge},
            Composer: newComposer,
            Lyrisist: newLyricist,
            Year: newYear,
            Origin: newOrigin,
            Type: newType,
            'Of Note': newOfNote
        });
        alert('Standard added successfully!');
        document.getElementById('new-standard').value = '';
        document.getElementById('new-bridge').value = '';
        document.getElementById('new-composer').value = '';
        document.getElementById('new-lyricist').value = '';
        document.getElementById('new-year').value = '';
        document.getElementById('new-origin').value = '';
        document.getElementById('new-type').value = '';
        document.getElementById('new-of-note').value = '';
    } else {
        alert('Please fill in all required fields.');
    }
}

// Cookie functions
function setCookie(name, value) {
    document.cookie = `${name}=${value};expires=Sun, 1 Jan 2023 00:00:00 UTC;path=/`;
}

function getCookie(name) {
    const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
}

// Initialize display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayRandomWord();
    displayRandomStandard();
});
