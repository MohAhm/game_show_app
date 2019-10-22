const overlay = document.getElementById('overlay');
const resetButton = overlay.querySelector('.btn__reset');

const phrase = document.getElementById('phrase');
const ul = phrase.querySelector('ul');
const qwerty = document.getElementById('qwerty');
const scoreboard = document.getElementById('scoreboard');
const ol = scoreboard.querySelector('ol');

// track of the number of guesses 
let missed = 0;

const phrases = [
    'Tell me what you see',
    'You are what you eat',
    'Seek and you shall find',
    'Until the cows come home',
    'A drop in the ocean',
    'Bad news travels fast',
    'Change is as good as a rest',
    'Dollars to doughnuts',
    'Excuse my French',
    'Fair and square'
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
            li.textContent = ch;
            li.className = 'letter';
        }

        ul.appendChild(li);
    }
}

// this function checks if the button the player has chosen
// match one of the letters
function checkLetter(btn) {
    const letters = ul.children;
    let match = null;

    for (let i = 0; i < letters.length; i++) {
        const li = letters[i];

        if (li.className === 'letter') {
            if (li.textContent.toLowerCase() === btn.textContent) {
                li.className += ' show';
                match = li.textContent;
            }
        }
    }

    // if the letter is found return it, otherwise return null
    return match ? match : null;
}

// this function set the appropriate screen overlay and text
function gameResult(result) {
    const p = document.createElement('p');
    p.textContent = `you ${result}!`;

    setTimeout(() => {
        overlay.appendChild(p);
        overlay.style.display = '';
        overlay.className = result;
        resetButton.textContent = 'Try Again';
    }, 1000);
}

// this function will check whether the game has been won or lost
function checkWin() {
    const letter = ul.querySelectorAll('.letter');
    const show = ul.querySelectorAll('.show');

    if (letter.length === show.length) {
        gameResult('win');
    } else if (missed >= 5) {
        gameResult('lose');
    }
}

// this function creates only the missing tries
function createTries() {
    const tries = 5 - ol.children.length;

    for (let i = 0; i < tries; i++) {
        const li = document.createElement('li');
        const img = document.createElement('img');

        li.className = 'tries';
        img.src = 'images/liveHeart.png';
        img.setAttribute('height', '35px');
        img.setAttribute('width', '30px');

        li.appendChild(img);
        ol.appendChild(li);

    }
}

// this function reset the game to default state
function resetGame() {
    const p = overlay.querySelector('p');
    if (overlay.contains(p)) {
        overlay.removeChild(p);
    }

    const lists = ul.querySelectorAll('li');
    lists.forEach(li => {
        ul.removeChild(li);
    });

    const buttons = qwerty.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.disabled) {
            btn.className = '';
            btn.disabled = false;
        }
    });

    missed = 0;
    createTries();
}

// generate random phrase
function generatePhrase() {
    const phraseArray = getRandomPhraseAsArray(phrases);
    // console.log(phraseArray);
    addPhraseToDisplay(phraseArray);
}


resetButton.addEventListener('click', () => {
    overlay.style.display = 'none';

    if (missed === 5 || (ul.children.length > 0)) {
        resetGame();
        generatePhrase();
    } else {
        generatePhrase();
    }

});


qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        btn.className = 'chosen';
        btn.disabled = true;

        const letterFound = checkLetter(btn);
        if (!letterFound) {
            if (ol.children.length > 0) {
                const li = ol.querySelector('li:first-child');
                ol.removeChild(li);
                missed += 1;
            }
        }

        checkWin();
    }
});