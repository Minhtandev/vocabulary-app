import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MyText from "../MyText";

const GameCard = ({
  style,
  index,
  title,
  textColor,
  onPress,
  disabled = false,
}) => {
  const [bgColor, setBgColor] = useState("#f8f6ff");
  const [count, setCount] = useState(0);
  const handlePress = (index) => {
    setCount(count + 1);
    onPress(index);
    setBgColor("#e2ddff");
    if (count % 2 === 1) {
      setBgColor("#f8f6ff");
    }
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
        borderWidth: 2,
        borderColor: "#8469ff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        shadowColor: "#8469ff",
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
      <MyText style={{ fontSize: 16, color: textColor }}>{title}</MyText>
    </TouchableOpacity>
  );
};

export default GameCard;
