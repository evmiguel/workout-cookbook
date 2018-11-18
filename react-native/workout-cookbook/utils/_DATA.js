/**
This file is for interacting with the backend directly.
*/

const RECIPES_API_URL = 'https://wu2pmkh798.execute-api.us-east-1.amazonaws.com/production/recipes'

function getRecipes() {
	return fetch(RECIPES_API_URL).then(response => response.json())
}

function addRecipe(recipe) {
	return fetch(RECIPES_API_URL, {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(recipe)
	}).then((data) => {
		return recipe
	})
	.catch((err) => {
		console.log(err)
		return err
	})
}

function deleteRecipe(name) {
	return fetch(RECIPES_API_URL, {
		method: 'DELETE',
		headers: {
	    	'Content-Type': 'application/json',
	  	},
	  body: JSON.stringify({ name: name})
	}).then((data) => {
		return
	})
	.catch((err) => {
		console.log(err)
		return err
	})
}

export function _getRecipes() {
	return getRecipes().then((recipes) => { return recipes['workouts'] })
}

export function _addRecipe(recipe) {
	return addRecipe(recipe).then((recipe) => { return recipe })
}

export function _deleteRecipe(name) {
	return deleteRecipe(name)
}