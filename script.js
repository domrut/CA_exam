const htmlMemes = document.querySelector(".memes");
const imageHolder = document.querySelector("img");
const inputs = document.querySelectorAll("input");
const generateButton = document.querySelector(".generate");
const downloadButton = document.querySelector(".download");

let image = "";
const generateImage = (imgSrc) => {
    imageHolder.src = imgSrc;
    image = imgSrc;
}

inputs[0].addEventListener("change", () => {
    document.querySelector(".inputas").innerText = inputs[0].value;
})

inputs[1].addEventListener("change", () => {
    document.querySelector(".inputas1").innerText = inputs[1].value;
})
const generateMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
            data.data.memes.forEach(el => {
                htmlMemes.innerHTML += `
                    <div class="meme" style="position: relative">
                        <img class="dydis" src=${el.url}>
                    </div>`
                const meme = document.querySelectorAll(".meme");
                meme.forEach(el => {
                    el.addEventListener("click", () => {
                        document.querySelector(".error").style.display = "flex";
                        generateImage(el.children[0].currentSrc)
                    })
                })
            })
        })
        .catch(err => console.log(err))
}

const sendMeme = (url) => {
    const item = {
        "topText": inputs[0].value,
        "bottomText": inputs[1].value,
        "imageUrl": url
    }
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    }
    fetch("http://167.99.138.67:9191/generate", fetchOptions)
        .then(res => res.json())
        .then(data => {
            downloadButton.disabled = false;
            downloadButton.innerHTML = `<a href=${data.data.url}>Download</a>`
        })
        .catch(err => console.log(err))
}

generateButton.addEventListener("click", () => {
    sendMeme(image)
})

generateMemes();

