console.log('sanity cherk')

const textBar = document.getElementById("text-bar")
const button = document.querySelector("button")
const pantryList = document.querySelector("ul")
const images = document.getElementById("images")
const submit = document.getElementById("submit")
const dietSelector = document.querySelector('select')
const fetchURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query="
const headers = {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "37daf3cd7cmshd6e976bb1dbe4dep11f211jsn70154af64eb3",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    } }

let spicyButton = document.getElementById("spicy")
let spicySearch = null
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
        img.setAttribute("src", `https://spoonacular.com/recipeImages/${recipes[i].image}`)
        img.setAttribute("alt", recipes[i].title)

        //create link elements
        let a = document.createElement("a")
        a.setAttribute("href", recipes[i].sourceUrl)
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
    ingredientList.push(elEyes[elEyes.length - 1].innerText.replace(' ', '%20'))
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
    // resets images in case 
    document.getElementById("meal-titles").innerHTML = ''
    images.innerHTML = ''
    let dietaryRequirements = dietSelector[dietSelector.selectedIndex].textContent
    if (spicyButton.checked === true) {
        spicySearch = "spicy"
    } 

    if (dietSelector.selectedIndex === 0) {
        fetch(`${fetchURL}${spicySearch}%2C${ingredientList[0]}%2C${ingredientList[1]}%2C${ingredientList[2]}&number=100`, headers)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                randomizer(recipes)
                imageCreator(recipes)
            })
    }
    else if (dietSelector.selectedIndex === 1 || dietSelector.selectedIndex === 2) {
        fetch(`${fetchURL}${spicySearch}%2C${ingredientList[0]}%2C${ingredientList[1]}%2C${ingredientList[2]}&excludeIngredients=${dietaryRequirements}&intolerances=${dietaryRequirements}&number=100`, headers)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData.results
                randomizer(recipes)
                imageCreator(recipes)
            })
    }
    else {
        fetch(`${fetchURL}${spicySearch}%2C${ingredientList[0]}%2C${ingredientList[1]}%2C${ingredientList[2]}&diet=${dietaryRequirements}&number=100`, headers)
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

