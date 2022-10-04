import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export const LearnVoc = ({ navigation, route }) => {
  return (
    <Text>This is {route.params.name} Linh test </Text>
  )
}
