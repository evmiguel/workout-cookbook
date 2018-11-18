import { _getRecipes, _addRecipe, _deleteRecipe } from './_DATA.js'

export function getRecipes() {
	return _getRecipes()
}

export function addRecipeBackend(recipe){
	return _addRecipe(recipe)
}

export function deleteRecipeBackend(name){
	return _deleteRecipe(name)
}