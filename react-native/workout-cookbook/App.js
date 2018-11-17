import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Recipes from './components/Recipes'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Recipes />
      </View>
    );
  }
}
