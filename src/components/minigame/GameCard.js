import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GameCard = ({
  style,
  index,
  title,
  textColor,
  onPress,
  disabled = false,
}) => {
  const [bgColor, setBgColor] = useState("#fff");
  const handlePress = (index) => {
    onPress(index);
    setBgColor("#e7f1d6");
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        flexDirection: "row",
        borderColor: "#c6c6c6",
        height: 180,
        marginRight: 15,
        flexBasis: "40%",
        flexGrow: 1,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#f3ef60",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        shadowColor: "#2196f3",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        ...style,
      }}
      onPress={() => handlePress(index)}
      disabled={disabled}
    >
      <Text style={{ fontSize: 16, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;
