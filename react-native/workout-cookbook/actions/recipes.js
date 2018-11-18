import { addRecipeBackend, deleteRecipeBackend } from '../utils/api'

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'

export function receiveRecipes(recipes) {
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

function deleteRecipe(name) {
	return {
		type: DELETE_RECIPE,
		name
	}
}

export function handleAddRecipe(recipe) {
	return (dispatch) => {
		return addRecipeBackend(recipe).then(recipe => {
			dispatch(addRecipe(recipe))
		})
	}
}

export function handleDeleteRecipe(name) {
	return (dispatch) => {
		return deleteRecipeBackend(name).then(() => {
			dispatch(deleteRecipe(name))
		})
	}
}