import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import TextButton from './TextButton'


class Recipes extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { recipes } = this.props
		return(
			<View style={styles.container}>
				{
					Object.keys(recipes).map(r =>
						<TextButton
							key={recipes[r].name}
							children={recipes[r].name}
							onPress={() => this.props.navigation.navigate('Recipe', { name: recipes[r].name })}
							style={[styles.button, styles.recipeBtn]}
							textStyle={styles.btnText}
						/>)
				}
			</View>
		)
	}
}

function mapStateToProps(state){
	return {
		recipes: state['recipes']
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    paddingLeft: 60,
	    paddingRight: 60,
	    marginBottom: 20
	},
	recipeBtn: {
	    backgroundColor: '#fff',
	},
	btnText: {
		fontSize: 22,
    	textAlign: 'center'
	}
})


export default connect(mapStateToProps)(Recipes)