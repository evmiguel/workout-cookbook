import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { handleAddRecipe } from '../actions/recipes'
import { connect } from 'react-redux'

class AddRecipe extends Component {
	state = {
		name: '',
		instructions: [
			{},
			{},
			{}
		]
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
			let instructionState = copyInstructions.splice(itemNum, 1).pop()
			copyInstructions[itemNum] = {
				...instructionState,
				[instructionKey]: isNaN(text) ? text : parseInt(text)
			}
			this.setState({
				instructions: copyInstructions
			})
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 50}}>What is the name of your recipe?</Text>
				<TextInput
						style={styles.input}
						placeholder="Recipe Name"
						onChangeText={(text) => this.handleInput(text, "name")}
						value={this.state.name }/>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 0, "step")}
						value={this.state.instructions[0].step }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 0, "length")}
						value={this.state.instructions[0].length }/>
				</View>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 1, "step")}
						value={this.state.instructions[0].step }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 1, "length")}
						value={this.state.instructions[0].length }/>
				</View>
				<View style={styles.instructionInputContainer}>
					<TextInput
						style={[styles.instructionNameInput, styles.input, {marginRight: 5}]}
						placeholder="Instruction"
						onChangeText={(text) => this.handleInput(text, "instructions", 2, "step")}
						value={this.state.instructions[0].step }/>
					<TextInput
						style={[styles.instructionTimeInput, styles.input]}
						placeholder="# min"
						onChangeText={(text) => this.handleInput(text, "instructions", 2, "length")}
						value={this.state.instructions[0].length }/>
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
	}
})


export default connect()(AddRecipe)