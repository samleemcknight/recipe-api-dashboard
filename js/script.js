console.log('sanity cherk')

const textBar = document.getElementById("text-bar")
const button = document.querySelector("button")
const pantryList = document.querySelector("ul")
const images = document.getElementById("images")
const submit = document.getElementById("submit")
const dietSelector = document.querySelector('select')
const fetchURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=f24d17246c854d4db4be39e3563ea267&query="

let spicyButton = document.getElementById("spicy")
let spicySearch = ''
if (spicyButton.checked === true) {
    spicySearch = "spicy"
} 

//currently defined here to help with console.logging
let elEyes = null
let recipes = null

let ingredientList = []

const imageCreator = (recipes) => {
    for (let i = 0; i < recipes.length; i++) {
        //create image elements
        let img = document.createElement("img")
        img.setAttribute("src", `${recipes[i].image}`)
        img.setAttribute("alt", recipes[i].title)

        //create link elements
        let a = document.createElement("a")
        a.setAttribute("href", `https://www.google.com/search?q=${recipes[i].title.split(' ').join('+')}+${dietSelector[dietSelector.selectedIndex].textContent}`)
        a.setAttribute("target", "_blank")
        images.appendChild(a)

        a.appendChild(img)

        //create p elements
        let p = document.createElement("p")
        p.innerText = recipes[i].title
        document.getElementById("meal-titles").appendChild(p)

        if (document.querySelectorAll('img').length === 6) { break }
    }
}

function randomizer(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function createList(evt) {
    evt.preventDefault()
    let li = document.createElement("li")
    li.setAttribute('title', 'click to remove')
    li.textContent = textBar.value
    pantryList.appendChild(li)
    elEyes = document.querySelectorAll('li')
    //to help with the search query, I want to take any spaces or punctuation out of the string
    // elEyes[elEyes.length - 1].innerText = elEyes[elEyes.length - 1].innerText.replace(' ', '')
    textBar.value = ''
    ingredientList.push(elEyes[elEyes.length - 1].innerText.replace(' ', '%'))
    randomizer(ingredientList)

    //event listener to allow the user to remove list items
    li.addEventListener("click", (evt) => {
        ingredientList = ingredientList.filter(word => word !== li.textContent)
        li.textContent = ''
    })
}

button.addEventListener("click", createList)

submit.addEventListener("click", (evt) => {
    evt.preventDefault()

    let dietaryRequirements = dietSelector[dietSelector.selectedIndex].textContent
    if (dietaryRequirements === "gluten-free") {dietaryRequirements = "gluten"}
    else if (dietaryRequirements === "dairy-free") { dietaryRequirements = "dairy" }

    // resets images and text 
    document.getElementById("meal-titles").innerHTML = ''
    images.innerHTML = ''

    // makes it spicy
    if (spicyButton.checked === true) {
        spicySearch = "%spicy"
    } 

    // to search with all ingredients:
    // `${fetchURL}${spicySearch}%2C${ingredients.join('%20')}&diet=${dietaryRequirements}&number=6`

    // conditional to search with dietary intolerances (dairy and gluten-free)
    if (dietSelector.selectedIndex === 1 || dietSelector.selectedIndex === 2) {
        fetch(`${fetchURL}${ingredientList[0]}&${ingredientList[1]}&${ingredientList[2]}${spicySearch}&intolerances=${dietaryRequirements}&number=6`)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                randomizer(recipes)
                imageCreator(recipes)
            })
    }    
    // conditional to search with no or otherdietary requierments
    else {
        fetch(`${fetchURL}${ingredientList[0]}&${ingredientList[1]}&${ingredientList[2]}${spicySearch}&diet=${dietaryRequirements}&number=6`)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                randomizer(recipes)
                imageCreator(recipes)
            })
    }  
})

