import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { handleAddRecipe } from '../actions/recipes'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class AddRecipe extends Component {
	state = {
		name: '',
		instructions: [
			{
				step: '',
				time: ''
			},
			{
				step: '',
				time: ''
			},
			{
				step: '',
				time: ''
			}
		]
	}

	submit = () => {
		let recipe = {...this.state}
		let totalTime = recipe.instructions.map(i => i.time).map(i => parseInt(i)).reduce((acc, val) => acc+val)
		recipe['total_time'] = totalTime.toString()

		this.props.dispatch(handleAddRecipe(recipe)).then(() => {
			this.props.navigation.navigate('Recipe', { name: recipe.name })
			this.resetState()
		})
	}

	resetState = () => {
		this.setState({
			name: '',
			instructions: [
				{
					step: '',
					time: ''
				},
				{
					step: '',
					time: ''
				},
				{
					step: '',
					time: ''
				}
			]
		})
	}

	handleInput = function(text, type){
		if (arguments.length < 3) {
			this.setState({
				[type]: text
			})
		} else {
			let instructionsStr = arguments[1]
			let itemNum = arguments[2]
			let instructionKey = arguments[3]
			let copyInstructions = [...this.state.instructions]
			let instructionState = Object.keys(copyInstructions).filter(i => i === itemNum.toString()).map(i => copyInstructions[i]).pop()
			copyInstructions[itemNum] = {
				...instructionState,
				[instructionKey]: isNaN(text) && instructionKey === 'step' ? text : isNaN(parseInt(text)) ? '' : parseInt(text).toString()
			}
			this.setState({
				instructions: copyInstructions
			})
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>What is the name of your workout recipe?</Text>
				<TextInput
						style={[styles.input, { width: '90%' }]}
						placeholder="Recipe Name"
						onChangeText={(text) => this.handleInput(text, "name")}
						value={this.state.name }/>
				<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 10}}>What are the instructions in your workout recipe?</Text>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 0, "step")}
						value={("0" in this.state.instructions) ? this.state.instructions[0].step : '' }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 0, "time")}
						value={("0" in this.state.instructions) ? this.state.instructions[0].time.toString() : '' }/>
				</View>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 1, "step")}
						value={("1" in this.state.instructions) ? this.state.instructions[1].step : '' }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 1, "time")}
						value={("1" in this.state.instructions) ? this.state.instructions[1].time.toString() : '' }/>
				</View>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 2, "step")}
						value={("2" in this.state.instructions) ? this.state.instructions[2].step : '' }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 2, "time")}
						value={("2" in this.state.instructions) ? this.state.instructions[2].time.toString() : '' }/>
				</View>
				<View style={styles.submitContainer}>
					<TextButton
						style={styles.submit}
						textStyle={styles.submitText}
						onPress={this.submit}
						children='Create Recipe'/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingBottom: 50
	},
	input: {
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    marginBottom: 20,
	    textAlign: 'left',
	    backgroundColor: '#fff'
	},
	instructionNameInput: {
		width: '70%'
	},
	instructionTimeInput: {
		width: '20%'
	},
	instructionInputContainer: {
		flexDirection: 'row'
	},
	submit: {
		alignSelf: 'flex-end',
		padding: 10,
	    borderRadius: 5,
	    borderColor: '#000',
	    borderWidth: 1.5,
	    height: 50,
	    paddingLeft: 60,
	    paddingRight: 60,
	    marginBottom: 10,
	    backgroundColor: "#000"
	},
	submitText: {
		color: "#fff",
		fontSize: 22,
    	textAlign: 'center'
	},
	submitContainer: {
		flex: 1,
		flexDirection: 'row'
	},
})


export default connect()(AddRecipe)