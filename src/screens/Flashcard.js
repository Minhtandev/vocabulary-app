import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export const Flashcard = ({ navigation, route }) => {
  return (
    <Text>This is {route.params.name}</Text>
  )
}
