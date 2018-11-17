import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/recipes'
import Recipe from './Recipe'

class Recipes extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		const { recipes } = this.props
		return(
			<View style={styles.container}>
				{
					Object.keys(recipes).map(r => <Recipe key={recipes[r].name} name={recipes[r].name} />)
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
	}
})


export default connect(mapStateToProps)(Recipes)