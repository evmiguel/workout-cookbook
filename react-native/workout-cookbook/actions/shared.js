import { RECEIVE_RECIPES } from './recipes'
import { getInitialData } from '../utils/api'
import { receiveRecipes } from './recipes'
import { receiveHistory } from './history'

export function handleInitialData() {
	return (dispatch) => {
		return getInitialData().then(({recipes, history}) => {
			dispatch(receiveRecipes(recipes))
			dispatch(receiveHistory(history))
		})
	}
}