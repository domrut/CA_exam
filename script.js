
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
            cardsLeft.innerText = data.remaining;
            console.log(data);
            cards.innerHTML = `
            <div class="d-flex j-btw dydis p20 borderis m10 f-direction">
                <p class="d-flex j-start">${data.cards[0].value}</p>
                <p class="d-flex j-end">${data.cards[0].value}</p>
            </div>`
        })
        .catch(err => console.log(err))
})
