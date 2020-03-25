const keys = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('a');
var overlay = document.querySelector('#overlay');
const resetButton = document.createElement('a');
const hearts = document.querySelectorAll('.tries');
let buttons = document.getElementsByTagName('button');

let missed = 0;


//Phrases Array
const phrases = [
    'believe in yourself',
    'never give up',
    'pay it forward',
    'work hard stay humble',
    'say yes to adventure',
    'hakuna matata',
    'this too shall pass',
    'do the impossible',
    'enjoy the little things',
    'show up and dont give up',
    // 'be fearlessly authentic'
];


//******FUNCTIONS******//

// Getting random phrase from Phrases array
const getRandomPhraseAsArray = arr => {
    const rand = arr[Math.floor(Math.random() * arr.length)];
    const chars = rand.split("");
    return chars;
}

//constant holding the character array
const charArray = getRandomPhraseAsArray(phrases);

//adding phrase to display in proper display blocks
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        let ul = document.querySelector('#phrase ul');
        let li = document.createElement('li');
        li.textContent = arr[i];
        li.style.fontWeight = '700';
        if (li.textContent !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}

//constant that holds when random phrase is selected then displayed
const addToDisplay = addPhraseToDisplay(charArray);

//check to see if the letter that was clicked is in the phrase
const checkLetter = guess => {
    const listItems = document.querySelectorAll('.letter');
    let match = 'null';
    for (let i = 0; i < listItems.length; i++) {
        if (guess.textContent === listItems[i].textContent) {
            listItems[i].className += " show";
            match = guess.textContent;
        }
    }
    return match;
}


const checkWin = () => {
    const letterItems = document.querySelectorAll('.letter');
    const showItems = document.querySelectorAll('.show');
    const title = document.querySelector('.title');

    if (letterItems.length === showItems.length) {
        showItems.forEach(showItem => showItem.className += " win-pulse");
        setTimeout(win, 1500);
    } else if (missed > 4) {
        hearts.forEach(heart => heart.className += " win-pulse");
        for (i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        setTimeout(lose, 1500);
    }

    /* Pauses rest of function so player can see the phrase they guessed correctly */
    function win() {
        overlay.style.display = '';
        startGame.style.display = 'none';
        resetButton.className = 'btn__reset';
        resetButton.textContent = 'PLAY AGAIN?';
        overlay.appendChild(resetButton);
        overlay.className = 'win';
        title.textContent = "YOU WON!!";
        clearKeyboard()
        clearPhrase();
    }

    function lose() {
        overlay.style.display = '';
        startGame.style.display = 'none';
        resetButton.className = 'btn__reset';
        resetButton.textContent = 'PLAY AGAIN?';
        overlay.appendChild(resetButton);
        overlay.className = 'lose';
        title.textContent = "YOU LOSE!!";
        clearKeyboard()
        clearPhrase();
    }
}

//Clears out phrase
function clearPhrase() {
    document.querySelector('#phraseUl').innerHTML = '';
}

//Clears out keyboard
function clearKeyboard() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        if (buttons[i].className === 'chosen') {
            buttons[i].className = '';
        }
    }
}

//Setting all hearts back to original state
function replaceHearts() {
    let imgs = document.getElementsByTagName('img');
    for (i = 0; i < imgs.length; i++) {
        imgs[i].src = 'images/liveHeart.png';
    };
    hearts.forEach(heart => heart.className = 'tries');
}


//******EVENT LISTENERS******//

startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
});

keys.addEventListener('click', (e) => {
    const key = e.target;
    if (key.tagName === 'BUTTON' && key.className !== 'chosen') {
        key.className = 'chosen';
        key.disabled = true;
        const letterFound = checkLetter(key);
        let img = document.querySelector('img[src="images/liveHeart.png"]');
        if (letterFound === 'null') {
            img.src = 'images/lostHeart.png';
            missed += 1;
            console.log(missed);
        }
    }
    checkWin();
});

resetButton.addEventListener('click', () => {
    const newPhrase = getRandomPhraseAsArray(phrases);
    overlay.style.display = 'none';
    clearKeyboard();
    replaceHearts();
    addPhraseToDisplay(newPhrase);
    missed = 0;
});

