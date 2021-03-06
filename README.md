# Find Me a Recipe
Find me a Recipe is a recipe application that uses the Spoonacular API. It recommends recipes based on what the user has in his or her “pantry”: a user-built list of on-hand ingredients. 

The user can select dietary requirements to try to find more specific recipes. However, given the results provided by the API, the ingredient search takes precedence over the diet. In other words, a dairy-free search might very well fetch results with dairy ingredients. This is an aspect that I want to resolve (see eventuals). 

## Techonologies Used
The app runs off of AJAX .fetch requests to the Spoonacular API. Once a user inputs ingredients, the ingredients are picked up by the DOM and passed into a request URL to the API. The fetched data is parsed and used to create the images and titles.

The original API would also provide URL's to the recipe itself. To sidestep this issue, I used the incoming data to create a specific google search that usually provides the given recipe.

In addition to recipe suggestions, the user is also given an idea of how many more ingredients they will need to complete the recipe:

![screenshot example](./assets/recipe_screenshot.png)

## Installation instructions

### required software:
In order to run this on your own machine, you will have to have and IDE that includes a text-editor with a live server. 

### downloading and running (command line)
1. Create a new directory and move into it: 
```mkdir <new-directory> && cd <new-directory>```
1. Clone the repo from github:
```git clone https://github.com/samleemcknight/recipe-api-dashboard.git```
1. Open the repo in your text editor
```open .``` or ``` atom . ``` or ``` code . ``` (depending on your text editor)
1. Run the live server

## User Stories
The most difficult thing for me about cooking is deciding what to cook. If I have all or most of the ingredients for a specific meal, I might search Google for recipes, but I otherwise tend to default to meals I'm comfortable with, and as a result see a lot of food go to waste.

I have often wanted an app that helps to prevent food waste. Furthermore, I find that forcing yourself to use all of your ingredients often makes you cook more interesting meals. 

At its current state, this app provides quick suggestions for meals based on the user's pantry.

The .fetch function will include three ingredients plus any dietary requirements. If the user, like me, wants almost every meal to be spicy, then a spicy search option can also be included in the parameters.

## Wireframes
At its simplest, I wanted the desktop view to be something like this:
![screenshot of wireframe](./assets/wireframe_screenshot.png)

For the sake of time, I kept this view roughly the same and did not greatly change it in order to give myself enough time to make a workable mobile view

### Desktop View:
<img src="./assets/desktop-view.png" width="100%" alt="screenshot of desktop view">

### Mobile View:
<img src="./assets/mobile-view.png" width="40%" alt="screenshot of mobile view">

## Eventuals 
There are a few things I would *eventually* like to do:

- organize images based on relevance
- Include serving size and prep time
- Expand the number of dietary preferences
- include a "clear pantry" button
- allow multiple ingredient to be put into individual li's 
- Ensure that the dietary requirements restrict the searches to a greater degree than they do
- *Eventually, eventually* I would like this to be a mobile-only app that will store users' ingredients in order to remind the user that certain ingredients might be going bad, and that those should be used soon.