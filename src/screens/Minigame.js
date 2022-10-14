import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import GameCard from "../components/minigame/GameCard";
import { compareAnswer, getIndexAnswer } from "../handle/getAnswer";

const gameData = [
  {
    id: "Q01",
    cards: [
      {
        id: "Q01.1",
        title: "dimension",
        value: true,
      },
      { id: "Q01.2", title: "kích thước; chiều", value: true },
      { id: "Q01.3", title: "quantity", value: false },
      { id: "Q01.4", title: "chất lượng", value: false },
    ],
  },
  {
    id: "Q02",
    cards: [
      {
        id: "Q02.1",
        title: "happy",
        value: false,
      },
      { id: "Q02.2", title: "fancy", value: true },
      { id: "Q02.3", title: "buồn", value: false },
      { id: "Q02.4", title: "sức tưởng tượng (n)", value: true },
    ],
  },
];

export const Minigame = ({ navigation, route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [disabledCard, setDisabledCard] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  var cards = gameData[currentQuestionIndex].cards;
  var trueAnswer = getIndexAnswer(cards);
  console.log("trueAnswer", trueAnswer);
  const [bgColor, setBgColor] = useState("#fff");
  // ====== handle press card
  const handlePress = (index) => {
    var newAnswers = answers;
    if (answers.length < 2) {
      newAnswers.push(index);
      setAnswers(newAnswers);
    }
    if (newAnswers.length == 2) {
      console.log(newAnswers);

      // khong cho press nua
      setDisabledCard(true);
      // setBackgroundColor
      let result = compareAnswer(newAnswers, trueAnswer);
      console.log("result", result);
      // console.log(62, result);
      if (result) {
        // bgColor = "#8dc43f";
        // console.log(bgColor);
        setBgColor("#8dc43f");
      } else {
        // bgColor = "#ec1b24";
        setBgColor("#ec1b24");
        // }
        // console.log("result", result);
        // setBgColor("#f0f2f5");
      }

      // console.log(answers);
    }
  };
  //====== handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < gameData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswers([]);
      trueAnswer = "";
      setDisabledCard(false);
      setShowNextButton(false);
      // setCards(gameData[currentQuestionIndex].cards);
      // setTrueAnswer(getIndexAnswer(cards));
    }
    // Animated.timing(progress, {
    //   toValue: currentQuestionIndex + 1,
    //   duration: 1000,
    //   useNativeDriver: false,
    // }).start();
  };
  // useEffect(() => {
  //   // if (answers.length === 2) {
  //   //   setTimeout(() => {
  //   //     if (result) {
  //   //     } else {
  //   //     }
  //   //   }, 500);
  //   // }
  // }, [answers, bgColor]);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#b7dce5"></StatusBar>
      <View style={styles.container}>
        {/*---- progressBar ----*/}
        <View style={styles.progress}>
          {/* QuestionCounter */}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>{currentQuestionIndex + 1}</Text>
            <Text style={styles.text}>/ {gameData.length}</Text>
          </View>
        </View>
        {/*----  Point ----*/}
        <View style={styles.point}>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="check"
              size={40}
              color="#8dc43f"
              style={{ marginRight: 5 }}
            />
            <Text
              style={{ fontSize: 30, color: "#8dc43f", fontWeight: "bold" }}
            >
              1
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="x"
              size={40}
              color="#ec1b24"
              style={{ marginRight: 5 }}
            />
            <Text
              style={{ fontSize: 30, color: "#ec1b24", fontWeight: "bold" }}
            >
              0
            </Text>
          </View>
        </View>
        {/*---- Game ----*/}
        <View style={styles.main}>
          {cards.length > 0 &&
            cards.map((item, index) =>
              answers.includes(index) ? (
                <GameCard
                  key={item.id}
                  title={item.title}
                  index={index}
                  answers={answers}
                  onPress={handlePress}
                  disabled={disabledCard}
                  style={{ backgroundColor: bgColor }}
                ></GameCard>
              ) : (
                <GameCard
                  key={item.id}
                  title={item.title}
                  index={index}
                  answers={answers}
                  onPress={handlePress}
                  disabled={disabledCard}
                ></GameCard>
              )
            )}
        </View>
        {/*---- Next Button ---*/}
        {showNextButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNextQuestion}
              disabled={currentQuestionIndex + 1 === gameData.length}
            >
              <Text
                style={{ fontSize: 20, color: "#fff", textAlign: "center" }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  progress: {
    height: 100,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    height: 700,
    flex: 1,
    marginRight: -15,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: 350,
    height: 100,
  },
  button: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#2196f3",
    padding: 20,
    borderRadius: 5,
  },
  point: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 100,
  },
});
