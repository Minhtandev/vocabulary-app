import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from "../components/minigame/GameCard";
// import { ProgressBar } from "react-native-paper";

export const Minigame = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.text}>0</Text>
        {/* <ProgressBar progress={0.5} color="#588000" /> */}
        <Text style={styles.text}>10</Text>
      </View>
      <View style={styles.main}>
        <GameCard></GameCard>
        <GameCard></GameCard>
        <GameCard></GameCard>
        <GameCard></GameCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  progress: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 30,
  },
  main: {
    flex: 1,
    marginRight: -15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

