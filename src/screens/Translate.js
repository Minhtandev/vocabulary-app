import { StyleSheet, View, TextInput, ImageBackground } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MyText from "../components/MyText";
import axios from "axios";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import image from "../../assets/translateBackground.jpg";
import * as Speech from "expo-speech";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "react-native-paper";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const COLOR = {
  icon: "#2d2c45",
  one: "#FF9F9F",
  two: "#B5E67B",
  three: "#B9E0FF",
  four: "#ADA2FF",

  bg: "#fff",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
  fourth: "#EEF1FF",
};

export const Translate = ({ navigation, route }) => {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");

  const voiceHandle = () => {
    // console.log("hello");
    Speech.speak(enteredText, { language: "en" });
  };

  const onSubmit = useCallback(() => {
    // console.log(
    //   "data>>>>",
    //   `{"text": "${String(enteredText)}","source":"en","target":"vi"}`
    // );
    const options = {
      method: "POST",
      url: "https://translate-plus.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "83fb7e66d0mshd18fdbda3e4d897p1f18d5jsn540d8eb88a00",
        "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
      },
      data: `{"text":"${String(enteredText)}","source":"en","target":"vi"}`,
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log("result>>>", response.data);
        // console.log("resultText>>>", response.data.translations.translation);
        setResultText(response.data.translations.translation);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  return (
    <ImageBackground source={image} resizeMode="cover">
      <View style={styles.cover}>
        <View style={styles.header}>
          <MyText>English</MyText>

          <MyText>Vietnamese</MyText>
        </View>
        <View style={styles.englishContent}>
          <TextInput
            multiline
            style={styles.input}
            maxLength={1000}
            placeholder="Entertext"
            value={enteredText}
            onChangeText={(text) => {
              setEnteredText(text);
              // console.log(text);
            }}
          ></TextInput>
          <AntDesign
            name="sound"
            size={18}
            color="white"
            onPress={voiceHandle}
            style={styles.sound_icon}
          />
        </View>
        <Pressable style={styles.translate} onPress={onSubmit}>
          {/* <Pressable style={styles.translate}> */}
          <MaterialIcons name="g-translate" size={24} color="#6e4fff" />
          <MyText style={{ fontSize: 18, color: "#6e4fff" }} weight={500}>
            Dịch
          </MyText>
        </Pressable>
        <View style={styles.vietnameseContent}>
          <MyText style={styles.translatedContent}>{resultText}</MyText>
          {/* <MyText style={styles.translatedContent}>
            Đây là nội dung được dịch
          </MyText> */}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    top: 10,
    height: 50,
    width: "80%",
    backgroundColor: COLOR.four,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
  englishContent: {
    width: "90%",
    height: "35%",
    top: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLOR.fourth,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  vietnameseContent: {
    width: "90%",
    height: "35%",
    top: 70,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLOR.fourth,
  },
  input: {
    width: "100%",
    height: "100%",
    padding: 10,
    fontSize: 16,
    top: 0,
    textAlignVertical: "top",
  },
  translatedContent: {
    width: "100%",
    height: "100%",
    padding: 10,
    fontSize: 16,
    top: 0,
  },
  translate: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ddd",
    borderRadius: 20,
    //position: "absolute",
    width: 90,
    height: 50,
    alignItems: "center",
    left: 10,
    top: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
  },
  sound_icon: {
    color: "#60bfeb",
    //backgroundColor: "#fcf9de",
    fontSize: 24,
    height: 50,
    textAlign: "center",
    lineHeight: 40,
    right: 10,
    top: -50,
    padding: 5,
    borderRadius: 10,
    //borderWidth: 2,
  },
});
