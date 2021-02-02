console.log('sanity cherk')

const textBar = document.getElementById("text-bar")
const button = document.querySelector("button")
const pantryList = document.querySelector("ul")
const images = document.getElementById("recipe-container")
const submit = document.getElementById("submit")

//currently defined here to help with console.logging
let elEyes = null
let recipes = null

let ingredientList = []

const imageCreator = (recipes) => {
    for (let i = 0; i < recipes.length; i++) {
        let img = document.createElement("img")
        img.setAttribute("src", `https://spoonacular.com/recipeImages/${recipes[i].image}`)
        img.setAttribute("alt", recipes[i].title)

        let a = document.createElement("a")
        a.textContent = img.getAttribute("alt")
        a.setAttribute("href", recipes[i].sourceUrl)
        a.setAttribute("target", "_blank")
        images.appendChild(a)

        a.appendChild(img)

        if (document.querySelectorAll('img').length === 6) { break }
    }
}

const randomizer = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

button.addEventListener("click", (evt) => {
    evt.preventDefault()
    let li = document.createElement("li")
    li.textContent = textBar.value
    pantryList.appendChild(li)
    elEyes = document.querySelectorAll('li')
    textBar.value = ''
    ingredientList.push(elEyes[elEyes.length - 1].innerText)
    randomizer(ingredientList)
})

submit.addEventListener("click", (evt) => {
    evt.preventDefault()
    // resets images in case 
    images.innerHTML = ''
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${ingredientList[0]}%2C${ingredientList[1]}%2C${ingredientList[2]}`,
    {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37daf3cd7cmshd6e976bb1dbe4dep11f211jsn70154af64eb3",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {
            recipes = jsonData.results
            randomizer(recipes)
            imageCreator(recipes)
        })
})


// for Tasty API - might use later, put testing out Recipe Puppy First

// submit.addEventListener("click", (evt) => {
//     evt.preventDefault()
//     let ingredientList = []
//     for (let i = 0; i < elEyes.length; i++) {
//         ingredientList.push(elEyes[i].innerText)
//     }
//         fetch(`https://tasty.p.rapidapi.com/recipes/list`, {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-key": "37daf3cd7cmshd6e976bb1dbe4dep11f211jsn70154af64eb3",
//                 "x-rapidapi-host": "tasty.p.rapidapi.com"
//             }
//         })
//             .then((responseData) => {
//                 return responseData.json()
//             })
//             .then((jsonData) => {
//                 recipes = jsonData.results
//                 console.log(recipes)
//             })
    
// })

