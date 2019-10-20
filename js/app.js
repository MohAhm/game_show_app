const overlay = document.getElementById('overlay');
const startButton = overlay.querySelector('.btn__reset');

const phrase = document.getElementById('phrase');
const ul = phrase.querySelector('ul');
const qwerty = document.getElementById('qwerty');
const scoreboard = document.getElementById('scoreboard');

// track of the number of guesses 
let missed = 0;

const phrases = [
    'tell me what you see',
    'you are what you eat',
    'seek and you shall find',
    'until the cows come home',
    'a picture is worth a thousand words'
]


// this function randomly choose a phrase from the phrases array 
// and split that phrase into a new array of characters
function getRandomPhraseAsArray(arr) {
    const phrase = Math.floor(Math.random() * arr.length);
    return arr[phrase].split('');
}

// this function loops through an array of characters,
// and then create a list item for each character
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const ch = arr[i];

        if (ch === ' ') {
            li.className = 'space';
        } else {
            li.innerHTML = ch;
            li.className = 'letter';
        }

        ul.appendChild(li);
    }
}

function checkLetter(btn) {
    const letters = ul.children;
    let match = null;

    for (let i = 0; i < letters.length; i++) {
        const li = letters[i];

        if (li.className === 'letter') {
            if (li.innerHTML === btn.innerHTML) {
                li.className += ' show';
                match = li.innerHTML;
            }
        }
    }

    // if the letter is found return it, otherwise return null
    return match ? match : null;
}

function checkWin() {
    const letter = ul.querySelectorAll('.letter');
    const show = ul.querySelectorAll('.show');

    if (letter.length === show.length) {
        overlay.style.display = '';
        overlay.className = 'win';
    } else if (missed >= 5) {
        overlay.style.display = '';
        overlay.className = 'lose';
    }
}


startButton.addEventListener('click', () => {
    overlay.style.display = 'none';

    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    // console.log(phraseArray);
});


qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        btn.className = 'chosen';
        btn.disabled = true;

        const letterFound = checkLetter(btn);
        if (!letterFound) {
            const ol = scoreboard.querySelector('ol');
            if (ol.children.length > 0) {
                const li = ol.querySelector('li:first-child');
                ol.removeChild(li);
                missed += 1;
            }
        }

        checkWin();
    }
});