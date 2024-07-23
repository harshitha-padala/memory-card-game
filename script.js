const cards = document.querySelectorAll('.card');
const message = document.getElementById('message');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches++;
    showMatchMessage();

    if (matches === cards.length / 2) {
        setTimeout(showWellPlayedMessage, 1000);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showMatchMessage() {
    message.textContent = 'Match!';
    message.classList.add('show');

    setTimeout(() => {
        message.classList.remove('show');
    }, 1000);
}

function showWellPlayedMessage() {
    message.textContent = 'Well played!';
    message.classList.add('show');
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));



