const textBar = document.getElementById("text-bar")
const button = document.getElementById("pantry-button")
const pantryList = document.querySelector("ul")
const images = document.getElementById("images")
const submit = document.getElementById("submit-button")
const dietSelector = document.querySelector('select')
const fetchURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=f24d17246c854d4db4be39e3563ea267&ingredients="

let spicyButton = document.getElementById("spicy")
let spicySearch = ''
if (spicyButton.checked === true) {
    spicySearch = "spicy"
} 

//currently defined here to help with console.logging
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
    //to help with the search query, I want to take any spaces or punctuation out of the string
    // elEyes[elEyes.length - 1].innerText = elEyes[elEyes.length - 1].innerText.replace(' ', '')
    textBar.value = ''
    ingredientList.push(li.textContent.replace(' ', '%20'))
    randomizer(ingredientList)

    //event listener to allow the user to remove list items
    li.addEventListener("click", (evt) => {
        pantryList.removeChild(li)
        ingredientList = ingredientList.filter(word => word !== li.textContent)
        ingredientList = ingredientList.filter(word => word !== li.textContent.replace(' ', '%20'))
    })
}

button.addEventListener("click", createList)

function userErrorMessage() {
    let message = document.createElement('h2')
    message.setAttribute("class", "error-message")
    message.textContent = "Oops! There appear to be no recipes with that search criteria. Try deleting one or two ingredients and search again!"
    images.appendChild(message)
}

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
        spicySearch = "%2Cspicy"
    } 

    // to search with all ingredients:
    // `${fetchURL}${ingredients.join(',+')}${spicySearch}&diet=${dietaryRequirements}&number=10`

    // conditional to search with dietary intolerances (dairy and gluten-free)
    if (dietSelector.selectedIndex === 1 || dietSelector.selectedIndex === 2) {
        console.log(`${fetchURL}${ingredientList[0]},+${ingredientList[1]},+${ingredientList[2]}${spicySearch}&intolerances=${dietaryRequirements}&number=10`)
        fetch(`${fetchURL}${ingredientList.join(',+')}${spicySearch}&intolerances=${dietaryRequirements}&number=10`)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData
                randomizer(recipes)
                imageCreator(recipes)
                if (recipes.length < 1) { userErrorMessage()}  
            })
            .catch(err => {
                console.error(err);
            });
    }    
    // conditional to search with no or otherdietary requierments
    else {
        console.log(`${fetchURL}${ingredientList[0]}%2C${ingredientList[1]}%2C${ingredientList[2]}${spicySearch}&diet=${dietaryRequirements}&number=10`)
        fetch(`${fetchURL}${ingredientList.join(',+')}${spicySearch}&diet=${dietaryRequirements}&number=10`)
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => {
                recipes = jsonData
                randomizer(recipes)
                imageCreator(recipes)
                if (recipes.length < 1) { userErrorMessage() }
            })
            .catch(err => {
                console.error(err);
            })
    }  
})

