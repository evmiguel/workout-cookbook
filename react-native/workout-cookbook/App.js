import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import { createAppContainer, createStackNavigator } from 'react-navigation'

const RecipeNavigator = createStackNavigator({
  Recipes: {
    screen: Recipes,
    navigationOptions: {
      title: 'Workout Recipes'
    }
  },
  Recipe: {
  	screen: Recipe
  }
})

const AppContainer = createAppContainer(RecipeNavigator);

export default class App extends React.Component {
  render() {
    return (
		<Provider store={createStore(reducers, middleware)}>
			<View style={{flex: 1}}>
				<AppContainer />
			</View>
		</Provider>
    );
  }
}
