import React from "react";
import { Text, View } from "react-native";

const GameCard = ({ params }) => (
  <View
    style={{
      flexDirection: "row",
      borderColor: "#c6c6c6",
      height: 100,
      marginRight: 15,
      flexBasis: "40%",
      flexGrow: 1,
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <Text>Gamecard</Text>
  </View>
);

export default GameCard;
