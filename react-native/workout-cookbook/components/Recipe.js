import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

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
		return (
			<View></View>
		)
	}
}

function mapStateToProps({recipes}, {navigation}) {
	return {
		recipe: Object.keys(recipes).filter(r => recipes[r].name === navigation.state.params.name).map(i => recipes[i]).pop()
	}
}
export default connect(mapStateToProps)(Recipe)