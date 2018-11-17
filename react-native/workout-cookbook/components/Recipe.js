import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import TextButton from './TextButton'

class Recipe extends Component {
	render() {
		const { name } = this.props
		return (
			<TextButton
				children={name}
				onPress={() => {console.log("Pressed")}}
			/>
		)
	}
}
export default Recipe