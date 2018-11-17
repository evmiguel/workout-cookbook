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
				<Text style={styles.title}>Recipe For</Text>
				<Text style={[styles.recipeName, {marginBottom: 15}]}>{titleCase(name)}</Text>
				<Text style={{fontSize: 20, marginBottom: 40}}>Total Time: {total_time} {total_time > 1 ? 'minutes' : 'minutes'}</Text>
				<Text style={{fontSize: 30, marginBottom: 15}}>Instructions:</Text>
				{
					instructions.map(i => (
						<View key={i.step} style={[styles.instruction, {marginBottom: 5}]}>
							<Text style={{fontSize: 25, marginRight: 5}}>{i.step} for</Text>
							<Text style={{fontSize: 25}}>{i.time} {i.time > 1 ? 'minutes' : 'minute' }</Text>
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
	title: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	instruction: {
		flexDirection: 'row'
	},
	recipeName: {
		fontSize: 50,
		fontWeight: 'bold',
		color: 'red'
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