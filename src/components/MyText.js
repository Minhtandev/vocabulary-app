import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

let customFonts = {
  "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
  "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
  "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
  "Inter-ExtraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
  "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
  "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
  "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
  "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
  "Inter-Thin": require("../../assets/fonts/Inter-Thin.ttf"),
  "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
  "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),
  "Nunito-ExtraLight": require("../../assets/fonts/Nunito-ExtraLight.ttf"),
  "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
  "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
  "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
  "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
  // "Nunito-Italic": require("../../assets/fonts/Inter-Italic.ttf"),
  "Inter-SemiBoldItalic":
    "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
};

const MyText = ({ style, weight, children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [font, setFont] = useState("Inter-Medium");

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    _loadFontsAsync();
    switch (weight) {
      // case 100:
      //   setFont("Nunito-Italic");
      //   break;
      case 200:
        setFont("Nunito-ExtraLight");
        break;
      case 300:
        setFont("Nunito-Light");
        break;
      case 400:
        setFont("Nunito-Regular");
        break;
      case 600:
        setFont("Nunito-SemiBold");
        break;
      case 700:
        setFont("Nunito-Bold");
        break;
      case 800:
        setFont("Nunito-ExtraBold");
        break;
      case 900:
        setFont("Nunito-Black");
        break;
      default:
        setFont("Nunito-Medium");
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={{ ...style, fontFamily: font }}>{children}</Text>;
};

export default MyText;
