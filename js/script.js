let cardValues = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
const cards = [];

const status = {
    click: false,
    flippedCards: 0,
    points: 0,
}

function game(){
    const startBtn = document.querySelector('#start');
    const restartBtn = document.querySelector('#restart');
    const board = document.querySelector('.card-container');

    setTimeout(() => {
        createCards(16);
        cards.forEach(card => {
            card.addEventListener('click', clickCard);
        });
    });

    startBtn.addEventListener('click', () => {
        status.click = true;
        startBtn.disabled = true;
        board.classList.remove('off');
    });

    restartBtn.addEventListener('click', () => location.reload());
}

function createCards(manyCards){
    const board = document.querySelector('.card-container');
    
    for (let i = 0; i < manyCards; i++) {
        const card = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');

        card.classList.add('card');
        card.classList.remove('flipped');
        card.classList.add('no-flipped');

        front.classList.add('front');
        back.classList.add('back');

        card.setAttribute('id', i)
        card.setAttribute('data-value', cardValues[i])
        
        board.appendChild(card);
        cards.push(card)
    }
}

function ramdomPositino({length}) {
    for (let i = 0; i < length; i++) {
        const position = Math.floor(Math.random() * length);
        let card = cardValues[position];
        
        cardValues[position]  = cardValues[i];
        cardValues[i] = card;
    }
}

function clickCard({ target }) {
    if (status.click) {
        const card = document.getElementById(target.attributes[1].value);

        card.removeEventListener('click', clickCard);
        card.classList.remove('no-flipped');
        card.classList.add('flipped');

        card.style.backgroundImage = `url(../assets/img/0${target.attributes[2].value}.jpg)`;
    
        status.flippedCards++;
        if (status.flippedCards === 2) {
            const cards = document.querySelectorAll('.flipped');
            const first = cards[0].attributes[2].value;
            const secound = cards[1].attributes[2].value;
    
            status.click = false;
            if (first === secound) {
                cards.forEach(card => {
                    card.classList.remove('no-flipped');
                    card.classList.remove('flipped');
                    card.classList.add('ok');
                    status.flippedCards = 0;
                    status.click = true;
                })
                status.points++;
            } else {
                cards.forEach( card => {
                    setTimeout(() => {
                        card.classList.add('no-flipped');
                        card.classList.remove('flipped');
                        status.flippedCards = 0;
                        card.addEventListener('click', clickCard);
                        status.click = true;
                    }, 600);
                })
            }
            
            if (status.points === 8){
                console.log('END')
                console.log('Point: ', status.points);
            }
        }
    }
}

ramdomPositino(cardValues)
game()