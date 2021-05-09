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
    'hakuna matata',
    'this too shall pass',
    'enjoy the little things',
    'show up and dont give up',
    'be fearlessly authentic',
    'when nothing goes right go left'
];


//******FUNCTIONS******//
const mainContainer = document.querySelector('.main-container');
const qwerty = document.querySelector('#qwerty');

// Returns random phrase from array //
function getRandomPhrase(arr) {
    const rand = arr[Math.floor(Math.random() * arr.length)];
    appendPhrase(rand);
}

// Create a new div then split phrase into words then append those words into new div then append div to body of document //
function appendPhrase(phrase) {
	const phraseEl = document.createElement('div');
    phraseEl.classList.add('phrase');
  
	phrase.split(' ').forEach(word => {
        appendWord(word, phraseEl); // Creates word and letter divs //
    });
    
    mainContainer.insertBefore(phraseEl, qwerty);
}

// Get word divs //
function appendWord(word, container) {
	const wordEl = document.createElement('div');
    wordEl.classList.add('word');
  
    word.split('').forEach(letter => {
  	appendLetter(letter, wordEl);
  });
  
	container.appendChild(wordEl);
}

// Get letter divs //
function appendLetter(letter, container) {
	const letterEl = document.createElement('div');
    letterEl.classList.add('letter');
    letterEl.textContent = letter;
    container.appendChild(letterEl);
}


// Check to see if the letter that was clicked is in the phrase
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
        title.style.color = "#1D273D";
        title.classList.add('scale-animation')
        clearKeyboard()
    }

    function lose() {
        overlay.style.display = '';
        startGame.style.display = 'none';
        resetButton.className = 'btn__reset';
        resetButton.textContent = 'TRY AGAIN?';
        overlay.appendChild(resetButton);
        overlay.className = 'lose';
        title.textContent = "YOU LOSE!!";
        title.style.color = "#1D273D";
        title.classList.add('scale-animation')
        clearKeyboard()
    }
}

//Clears out phrase
function clearPhrase() {
    document.querySelectorAll('.phrase').forEach(phrase => phrase.remove());
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
    getRandomPhrase(phrases);
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
        }
    }
    checkWin();
});

resetButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    clearPhrase();
    clearKeyboard();
    replaceHearts();
    getRandomPhrase(phrases);
    missed = 0;
});