import { RECEIVE_RECIPES, ADD_RECIPE, DELETE_RECIPE } from '../actions/recipes'

export default function recipes(state = {}, action) {
	switch(action.type) {
		case RECEIVE_RECIPES:
			return {
				...state,
				...action.recipes
			}
		case ADD_RECIPE:
			return {
				...state,
				[Object.keys(state).length+1]: {
					...action.recipe
				}
			}
		case DELETE_RECIPE:
			const newState = Object.assign({}, state)
			const recipes = Object.keys(newState).map(i => newState[i]).filter(r => r.name !== action.name)
			return {
				...recipes
			}
		default:
			return state
	}
}