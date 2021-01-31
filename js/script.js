console.log('sanity cherk')

const textBar = document.getElementById("text-bar")
const button = document.querySelector("button")
const pantryList = document.querySelector("ul")
const images = document.getElementById("image-container")
const submit = document.getElementById("submit")

//currently defined here to help with console.logging
let elEyes = null
let recipes = null

const imageCreator = (recipes) => {
    for (let i = 0; i < recipes.length; i++) {
        if (typeof recipes[i].thumbnail !== "undefined") {
            let img = document.createElement("img")
            img.setAttribute("src", recipes[i].thumbnail)
            img.setAttribute("alt", recipes[i].title)
            images.appendChild(img)
            let a = document.createElement("a")
            a.textContent = img.getAttribute("alt")
            a.setAttribute("href", recipes[i].href)
            a.setAttribute("target", "_blank")
            images.appendChild(a)
        }
    }
}

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
    fetch(`http://www.recipepuppy.com/api/?i=${ingredientList[0]},${ingredientList[1]},${ingredientList[2]}`)
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => {
            recipes = jsonData.results
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

