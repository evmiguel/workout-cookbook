import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Recipe = (props) => {
	const { name } = props
	return (
		<Text>{name}</Text>
	)
}
export default Recipe