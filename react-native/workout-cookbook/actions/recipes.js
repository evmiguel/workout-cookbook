import { getRecipes, addRecipeBackend } from '../utils/api'

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'

function receiveRecipes(recipes) {
	return {
		type: RECEIVE_RECIPES,
		recipes
	}
}

function addRecipe(recipe) {
	return {
		type: ADD_RECIPE,
		recipe
	}
}

export function handleInitialData() {
	return (dispatch) => {
		return getRecipes().then(recipes => {
			dispatch(receiveRecipes(recipes))
		})
	}
}

export function handleAddRecipe(recipe) {
	return (dispatch) => {
		return addRecipeBackend(recipe).then(recipe => {
			dispatch(addRecipe(recipe))
		})
	}
}