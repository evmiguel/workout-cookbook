import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Recipe extends Component {
	static navigationOptions = ({ navigation }) => {
	    const { name } = navigation.state.params

	    return {
	      title: (name === name.toLowerCase())
	      		? name.split(' ').map(w => w[0].toUpperCase() + name.substr(1).toLowerCase()).join(' ')
	      		: name
	    }
  	}

	render() {
		const { name, onPress } = this.props
		return (
			<View></View>
		)
	}
}
export default Recipe