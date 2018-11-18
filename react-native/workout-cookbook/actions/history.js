export const RECEIVE_HISTORY = 'RECEIVE_HISTORY'

export function receiveHistory(history) {
	return {
		type: RECEIVE_HISTORY,
		history
	}
}