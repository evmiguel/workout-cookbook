import { getRecipes } from '../utils/api'

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'

function receiveRecipes(recipes) {
	return {
		type: RECEIVE_RECIPES,
		recipes
	}
}

export function handleInitialData() {
	return (dispatch) => {
		return getRecipes().then(recipes => {
			dispatch(receiveRecipes(recipes))
		})
	}
}