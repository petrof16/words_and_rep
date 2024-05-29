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
    document.getElementById('definition').textContent = `Definition: ${randomWord.definition}`;
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
        document.getElementById('bridge').textContent = `Bridge: ${randomStandard.Bridge.notes}`;
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
        alert('Please fill in the required fields (Standard and Composer).');
    }
}

// Function to parse CSV content
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((object, header, index) => {
            object[header.trim()] = values[index].trim();
            return object;
        }, {});
    });
}

// Function to batch upload words
function batchUploadWords() {
    const fileInput = document.getElementById('word-file-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const newWords = parseCSV(event.target.result);
                newWords.forEach(word => {
                    if (word.word && word.definition && word.example) {
                        wordsData.push(word);
                    }
                });
                alert('Words uploaded successfully!');
            } catch (e) {
                alert('Invalid CSV file.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}

// Function to batch upload standards
function batchUploadStandards() {
    const fileInput = document.getElementById('standard-file-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const newStandards = parseCSV(event.target.result);
                newStandards.forEach(standard => {
                    if (standard.Standard && standard.Composer) {
                        standardData.push({
                            Standard: standard.Standard,
                            Bridge: {notes: standard.Bridge},
                            Composer: standard.Composer,
                            Lyrisist: standard.Lyrisist,
                            Year: standard.Year,
                            Origin: standard.Origin,
                            Type: standard.Type,
                            'Of Note': standard['Of Note']
                        });
                    }
                });
                alert('Standards uploaded successfully!');
            } catch (e) {
                alert('Invalid CSV file.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}

// Function to search words
function searchWord() {
    const query = document.getElementById('search-word').value.toLowerCase();
    const results = wordsData.filter(word => word.word.toLowerCase().includes(query));
    const resultsContainer = document.getElementById('word-results');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = `${result.word}: ${result.definition}`;
        resultsContainer.appendChild(resultDiv);
    });
}

// Function to search standards
function searchStandard() {
    const query = document.getElementById('search-standard').value.toLowerCase();
    const results = standardData.filter(standard => standard.Standard.toLowerCase().includes(query));
    const resultsContainer = document.getElementById('standard-results');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = `${result.Standard} by ${result.Composer}`;
        resultsContainer.appendChild(resultDiv);
    });
}

// Function to export calendar with reminders
function exportCalendar() {
    const icsData = [];
    wordsData.forEach((word, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const reminderTime = 'T100000';
        const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
        icsData.push(`
BEGIN:VEVENT
SUMMARY:Word of the Day: ${word.word}
DESCRIPTION:Definition: ${word.definition}\nExample: ${word.example}
DTSTART:${dateString}${reminderTime}
DTEND:${dateString}T101500
END:VEVENT
        `);
    });

    standardData.forEach((standard, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        const reminderTime = 'T100000';
        const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
        icsData.push(`
BEGIN:VEVENT
SUMMARY:Standard of the Day: ${standard.Standard}
DESCRIPTION:Composer: ${standard.Composer}\nLyricist: ${standard.Lyrisist}\nBridge: ${standard.Bridge.notes}\nYear: ${standard.Year}\nOrigin: ${standard.Origin}\nType: ${standard.Type}\nOf Note: ${standard['Of Note']}
DTSTART:${dateString}${reminderTime}
DTEND:${dateString}T101500
END:VEVENT
        `);
    });

    const icsFileContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Product//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${icsData.join('')}
END:VCALENDAR
    `;

    const blob = new Blob([icsFileContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'words_and_standards_calendar.ics';
    link.click();
}

// Function to generate calendar
function generateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const calendar = document.createElement('div');
    calendar.classList.add('calendar');

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = 1; day <= monthDays; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.textContent = day;
        dayDiv.setAttribute('draggable', 'true');
        dayDiv.addEventListener('dragover', event => event.preventDefault());
        dayDiv.addEventListener('drop', handleDrop);
        calendar.appendChild(dayDiv);
    }

    calendarContainer.appendChild(calendar);
}

// Function to handle drop event
function handleDrop(event) {
    const data = event.dataTransfer.getData('text/plain');
    const dropTarget = event.target;
    dropTarget.textContent += ` ${data}`;
}

// Function to populate the word and standard lists
function populateLists() {
    const wordList = document.getElementById('word-list');
    wordsData.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word.word;
        listItem.setAttribute('draggable', 'true');
        listItem.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', word.word);
        });
        wordList.appendChild(listItem);
    });

    const standardList = document.getElementById('standard-list');
    standardData.forEach(standard => {
        const listItem = document.createElement('li');
        listItem.textContent = standard.Standard;
        listItem.setAttribute('draggable', 'true');
        listItem.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', standard.Standard);
        });
        standardList.appendChild(listItem);
    });
}

// Function to randomly assign words and standards to a calendar
function randomAssign() {
    const totalDays = parseInt(document.getElementById('total-days').value);
    const calendarContainer = document.getElementById('calendar');
    const calendarDays = calendarContainer.querySelectorAll('.calendar-day');

    if (totalDays > calendarDays.length) {
        alert('The number of days exceeds the number of days in the month.');
        return;
    }

    const allItems = [...wordsData, ...standardData];
    const selectedItems = [];

    while (selectedItems.length < totalDays) {
        const randomIndex = Math.floor(Math.random() * allItems.length);
        selectedItems.push(allItems[randomIndex]);
        allItems.splice(randomIndex, 1);
    }

    selectedItems.forEach((item, index) => {
        calendarDays[index].textContent += ` ${item.word || item.Standard}`;
    });
}

// Initial function calls
document.addEventListener('DOMContentLoaded', () => {
    displayRandomWord();
    displayRandomStandard();

    if (document.getElementById('calendar')) {
        generateCalendar();
        populateLists();
    }
});

// Cookie functions
function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function getCookie(name) {
    const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
}
