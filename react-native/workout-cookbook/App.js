import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middleware from './middleware'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import AddRecipe from './components/AddRecipe'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'

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

const AddRecipeNavigator = createStackNavigator({
  AddRecipe: {
    screen: AddRecipe
  }
})


const MainNavigator = createBottomTabNavigator({
  DeckView: {
    screen: RecipeNavigator,
    navigationOptions: {
      tabBarLabel: 'Recipes',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddRecipeView: {
    screen: AddRecipeNavigator,
    navigationOptions: {
      tabBarLabel: 'Add Recipe',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus-box' size={30} color={tintColor} />
    }
  }
})

const AppContainer = createAppContainer(MainNavigator);

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
