import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

class History extends Component {
	render() {
		console.log(this.props.history)
		return(
			<View>
				<Text>HISTORY</Text>
			</View>
		)
	}
}

function mapStateToProps({history}){
	return {
		history
	}
}

export default connect(mapStateToProps)(History)