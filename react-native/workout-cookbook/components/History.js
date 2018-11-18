import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

class History extends Component {
	render() {
		const { history } = this.props
		return(
			<View style={styles.container}>
				<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>Your Workout History:</Text>
				{
					history &&
					Object.keys(history).map(i => history[i]).map(({datetime, workout, length}) =>
						<Text style={{fontSize: 18, marginBottom: 5}} key={new Date(datetime).toJSON()}>{length} minute {workout} on {new Date(datetime).toLocaleDateString()} at {new Date(datetime).toLocaleTimeString()}</Text>)
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

function mapStateToProps({history}){
	return {
		history
	}
}

export default connect(mapStateToProps)(History)