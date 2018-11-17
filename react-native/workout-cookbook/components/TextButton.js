import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton ({ children, onPress, style, textStyle = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}
