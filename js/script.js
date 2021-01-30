console.log('sanity cherk')

const textBar = document.getElementById("text-bar")
const button = document.querySelector("button")
const pantryList = document.querySelector("ul")
const submit = document.getElementById("submit")
let elEyes = null
let recipes = null

button.addEventListener("click", (evt) => {
    evt.preventDefault()
    let li = document.createElement("li")
    li.textContent = textBar.value
    pantryList.appendChild(li)
    elEyes = document.querySelectorAll('li')
})

submit.addEventListener("click", (evt) => {
    evt.preventDefault()
    let ingredientList = []
    for (let i = 0; i < elEyes.length; i++) {
        ingredientList.push(elEyes[i].innerText)
    }
    if (ingredientList.length === 1) {
        fetch(`https://tasty.p.rapidapi.com/recipes/list`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37daf3cd7cmshd6e976bb1dbe4dep11f211jsn70154af64eb3",
                "x-rapidapi-host": "tasty.p.rapidapi.com"
            }
        })
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                console.log(recipes)
            })
    }
    else if (ingredientList.length === 2) {
        fetch(`https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${ingredientList[0]}%20${ingredientList[1]}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37daf3cd7cmshd6e976bb1dbe4dep11f211jsn70154af64eb3",
                "x-rapidapi-host": "tasty.p.rapidapi.com"
            }
        })
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                console.log(recipes)
            })
    }
    
})

