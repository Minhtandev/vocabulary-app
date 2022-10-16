import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GameCard = ({
  style,
  index,
  title,
  colorResult,
  answers = [],
  onPress,
  disabled = false,
}) => {
  const [bgColor, setBgColor] = useState("#fff");
  const handlePress = (index) => {
    onPress(index);
    setBgColor("#f0f2f5");
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        flexDirection: "row",
        borderColor: "#c6c6c6",
        height: 150,
        marginRight: 15,
        flexBasis: "40%",
        flexGrow: 1,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        ...style,
      }}
      onPress={() => handlePress(index)}
      disabled={disabled}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;
