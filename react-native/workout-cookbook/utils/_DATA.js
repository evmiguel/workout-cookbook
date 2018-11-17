/**
This file is for interacting with the backend directly.
*/

const API_URL = 'https://wu2pmkh798.execute-api.us-east-1.amazonaws.com/production/recipes'

function getRecipes() {
	return fetch(API_URL).then(response => response.json())
}

export function _getRecipes(){
	return getRecipes().then((recipes) => { return recipes['workouts'] })
}