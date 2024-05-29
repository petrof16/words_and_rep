const wordsData = [
    { word: "cognitive", definition: "the mental action...", example: "Her cognitive abilities were outstanding." },
    // add other words here
];

const standardData = [
    { Standard: "All The Things You Are", Bridge: { notes: "" }, Composer: "Jerome Kern", Lyrisist: "Oscar Hammerstein", Year: "", Origin: "", Type: "", 'Of Note': "" },
    // add other standards here
];

function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function getCookie(name) {
    const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return keyValue ? keyValue[2] : null;
}

// Other functions remain the same

document.addEventListener('DOMContentLoaded', () => {
    displayRandomWord();
    displayRandomStandard();

    if (document.getElementById('calendar')) {
        generateCalendar();
        populateLists();
    }
});