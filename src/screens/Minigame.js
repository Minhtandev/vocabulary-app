import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export const Minigame = ({ navigation, route }) => {
  return (
    <Text>This is {route.params.name}</Text>
  )
}