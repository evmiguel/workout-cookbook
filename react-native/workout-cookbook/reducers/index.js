import { combineReducers } from 'redux'
import recipes from './recipes'
import history from './history'

export default combineReducers({
	recipes,
	history
})