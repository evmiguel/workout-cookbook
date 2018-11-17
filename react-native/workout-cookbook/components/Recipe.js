import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Recipe extends Component {
	static navigationOptions = ({ navigation }) => {
	    const { name } = navigation.state.params

	    return {
	      title: titleCase(name)
	    }
  	}

	render() {
		const { name, total_time, instructions } = this.props.recipe
		return (
			<View style={styles.container}>
				<Text>Recipe for:</Text>
				<Text>{titleCase(name)}</Text>
				<Text>Total Time: {total_time} {total_time > 1 ? 'minutes' : 'minutes'}</Text>
				<Text>Instructions:</Text>
				{
					instructions.map(i => (
						<View key={i.step} style={styles.instruction}>
							<Text style={{marginRight: 10}}>{i.step}</Text>
							<Text>{i.time}</Text>
						</View>
					))
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
	},
	instruction: {
		flexDirection: 'row'
	}
})

function titleCase(str){
	if (typeof str !== 'undefined') {
		let string = (str === str.toLowerCase())
      		? str.split(' ').map(w => w[0].toUpperCase() + str.substr(1).toLowerCase()).join(' ')
      		: str
		return string
	}
}

function mapStateToProps({recipes}, {navigation}) {
	return {
		recipe: Object.keys(recipes).filter(r => recipes[r].name === navigation.state.params.name).map(i => recipes[i]).pop()
	}
}
export default connect(mapStateToProps)(Recipe)