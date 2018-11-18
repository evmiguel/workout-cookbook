import { _getRecipes, _addRecipe, _deleteRecipe, _getHistory } from './_DATA.js'

export function getInitialData() {
	return Promise.all([
			_getRecipes(),
			_getHistory()
		]).then(([recipes, history]) => ({
		recipes,
		history,
	}))
}

export function addRecipeBackend(recipe){
	return _addRecipe(recipe)
}

export function deleteRecipeBackend(name){
	return _deleteRecipe(name)
}