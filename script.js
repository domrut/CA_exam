
let cardData = "";
const button = document.querySelector("button");
const cardsLeft = document.querySelector(".cardsLeft");
const cards = document.querySelector(".cards");
window.addEventListener("load", () => {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            cardData = data.deck_id;
        })
        .catch(err => console.log(err))
})

button.addEventListener("click", () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${cardData}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards[0].image, data.remaining, data);
            cardsLeft.innerText = data.remaining;
        })
        .catch(err => console.log(err))
})
