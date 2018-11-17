import { RECEIVE_RECIPES, ADD_RECIPE } from '../actions/recipes'

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
		default:
			return state
	}
}