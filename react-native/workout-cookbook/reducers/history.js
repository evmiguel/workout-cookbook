import { RECEIVE_HISTORY } from '../actions/history'

export default function history(state = {}, action) {
	switch(action.type) {
		case RECEIVE_HISTORY:
			return {
				...state,
				...action.history
			}
		default:
			return state
	}
}