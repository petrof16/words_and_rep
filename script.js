const wordsData = JSON.parse(localStorage.getItem('wordsData')) || [];
const standardData = JSON.parse(localStorage.getItem('standardData')) || [];

function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function getCookie(name) {
    const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
}

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
    document.getElementById('example').textContent = randomWord.example;
}

function displayRandomStandard() {
    const currentTimestamp = new Date().getTime();
    let currentIndex = parseInt(getCookie('standardIndex'));
    let lastTimestamp = parseInt(getCookie('lastStandardTimestamp')) || 0;

    if (currentTimestamp > lastTimestamp + 24 * 60 * 60 * 1000) {
        currentIndex = Math.floor(Math.random() * standardData.length);
        setCookie('standardIndex', currentIndex);
        setCookie('lastStandardTimestamp', currentTimestamp);
    }

    const randomStandard = standardData[currentIndex];

    document.getElementById('standard').textContent = randomStandard.Standard;
    document.getElementById('composer').textContent = `Composer: ${randomStandard.Composer}`;
    document.getElementById('lyricist').textContent = `Lyricist: ${randomStandard.Lyricist}`;
    document.getElementById('year').textContent = `Year: ${randomStandard.Year}`;
    document.getElementById('origin').textContent = `Origin: ${randomStandard.Origin}`;
    document.getElementById('type').textContent = `Type: ${randomStandard.Type}`;
    document.getElementById('notes').textContent = `Notes: ${randomStandard.Bridge.notes}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('word-container')) {
        displayRandomWord();
    }
    if (document.getElementById('standard-container')) {
        displayRandomStandard();
    }
});

document.getElementById('new-word').addEventListener('input', async function() {
    const word = this.value.trim();
    if (word.length > 0) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.ok) {
            const data = await response.json();
            if (data[0] && data[0].meanings && data[0].meanings[0] && data[0].meanings[0].definitions[0]) {
                document.getElementById('new-definition').value = data[0].meanings[0].definitions[0].definition;
            } else {
                document.getElementById('new-definition').value = '';
            }
        } else {
            document.getElementById('new-definition').value = '';
        }
    } else {
        document.getElementById('new-definition').value = '';
    }
});

document.getElementById('word-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newWord = document.getElementById('new-word').value;
    const newDefinition = document.getElementById('new-definition').value;
    const newExample = document.getElementById('new-example').value;

    const wordsData = JSON.parse(localStorage.getItem('wordsData')) || [];
    wordsData.push({ word: newWord, definition: newDefinition, example: newExample });
    localStorage.setItem('wordsData', JSON.stringify(wordsData));

    document.getElementById('word-confirmation').textContent = 'New word added successfully!';
    document.getElementById('word-form').reset();

    // Refresh the Everything page
    updateEverythingPage();
});

document.getElementById('standard-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newStandard = document.getElementById('new-standard').value;
    const newComposer = document.getElementById('new-composer').value;
    const newLyricist = document.getElementById('new-lyricist').value;
    const newYear = document.getElementById('new-year').value;
    const newOrigin = document.getElementById('new-origin').value;
    const newType = document.getElementById('new-type').value;
    const newNotes = document.getElementById('new-notes').value;

    const standardData = JSON.parse(localStorage.getItem('standardData')) || [];
    standardData.push({ Standard: newStandard, Composer: newComposer, Lyricist: newLyricist, Year: newYear, Origin: newOrigin, Type: newType, Bridge: { notes: newNotes } });
    localStorage.setItem('standardData', JSON.stringify(standardData));

    document.getElementById('standard-confirmation').textContent = 'New standard added successfully!';
    document.getElementById('standard-form').reset();

    // Refresh the Everything page
    updateEverythingPage();
});

function updateEverythingPage() {
    const wordsUl = document.getElementById('words-ul');
    const standardsUl = document.getElementById('standards-ul');

    if (wordsUl) {
        wordsUl.innerHTML = '';
        const wordsData = JSON.parse(localStorage.getItem('wordsData')) || [];
        wordsData.forEach(word => {
            const li = document.createElement('li');
            li.textContent = `${word.word}: ${word.definition} (Example: ${word.example})`;
            wordsUl.appendChild(li);
        });
    }

    if (standardsUl) {
        standardsUl.innerHTML = '';
        const standardData = JSON.parse(localStorage.getItem('standardData')) || [];
        standardData.forEach(standard => {
            const li = document.createElement('li');
            li.textContent = `${standard.Standard} by ${standard.Composer}`;
            standardsUl.appendChild(li);
        });
    }
}
