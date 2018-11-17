import { _getRecipes, _addRecipe } from './_DATA.js'

export function getRecipes() {
	return _getRecipes()
}

export function addRecipeBackend(recipe){
	return _addRecipe(recipe)
}