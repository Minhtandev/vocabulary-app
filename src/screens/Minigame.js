import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  ImageBackground,
  Modal,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GameCard from "../components/minigame/GameCard";
import { compareAnswer, getIndexAnswer } from "../handle/getAnswer";

import MyText from "../components/MyText";

const COLOR = {
  success: "#12d18e",
  wrong: "#f75555",
  progress: "#8368ff",
  button: "#34b1fd",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
};

const RESULTS = {
  first: "Not good at all",
  second: "That's not good enough",
  third: "Very good",
};

// const gameData = [
//   {
//     id: "Q01",
//     cards: [
//       {
//         id: "Q01.1",
//         title: "dimension",
//         value: true,
//       },
//       { id: "Q01.2", title: "kích thước; chiều", value: true },
//       { id: "Q01.3", title: "quantity", value: false },
//       { id: "Q01.4", title: "chất lượng", value: false },
//     ],
//   },
//   {
//     id: "Q02",
//     cards: [
//       {
//         id: "Q02.1",
//         title: "happy",
//         value: false,
//       },
//       { id: "Q02.2", title: "fancy", value: true },
//       { id: "Q02.3", title: "buồn", value: false },
//       { id: "Q02.4", title: "sức tưởng tượng (n)", value: true },
//     ],
//   },
//   {
//     id: "Q03",
//     cards: [
//       {
//         id: "Q03.1",
//         title: "expire",
//         value: false,
//       },
//       { id: "Q03.2", title: "sự thao tác", value: true },
//       { id: "Q03.3", title: "manipulation", value: true },
//       { id: "Q03.4", title: "xuất khẩu", value: false },
//     ],
//   },
// ];

export const Minigame = ({ navigation, route }) => {
  // data from create Game
  const gameData = route.params?.gameData || [];
  // const number = route.params?.number || 10;
  // LogBox.ignoreLogs(["83", gameData]);

  // gameData

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [disabledCard, setDisabledCard] = useState(false);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showNextButton, setShowNextButton] = useState(true);
  if (gameData.length > 0) {
    var cards = gameData[currentQuestionIndex].cards;
  } else var cards = [];
  var trueAnswer = getIndexAnswer(cards);
  const [bgColor, setBgColor] = useState("#fff");
  //===== modal show
  const [modalVisible, setModalVisible] = useState(false);
  //==== âm thanh true - false
  const [sound, setSound] = useState();
  async function playSoundTrue() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/correct-answer.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }
  async function playSoundFalse() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/incorrect-answer.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  // ====== handle press card
  const handlePress = (index) => {
    //*********** */ mỗi card chỉ được click 1 lần
    //********* click 2 lần thì bỏ chọn */
    var newAnswers = answers;
    if (answers.includes(index)) {
      newAnswers = newAnswers.filter((item) => item !== index);
      setAnswers(newAnswers);
      //-->> fixxxx đổi màu -> OK
    } else if (newAnswers.length < 2) {
      newAnswers.push(index);
      setAnswers(newAnswers);
    }
    if (newAnswers.length == 2) {
      // khong cho press nua
      setDisabledCard(true);
      // setBackgroundColor
      let result = compareAnswer(newAnswers, trueAnswer);
      if (result) {
        playSoundTrue();
        setBgColor(COLOR.success);
        setScore((score) => score + 1);
      } else {
        playSoundFalse();
        setBgColor(COLOR.wrong);
        setWrong((wrong) => wrong + 1);
        //------------------------
        // --> cho user làm lại cho đến khi đúng, nhưng điểm không tác động...
        //------------------------
      }
    }
  };
  //====== handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex === gameData.length - 1) {
      setModalVisible(true);
    }
    if (currentQuestionIndex < gameData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswers([]);
      trueAnswer = "";
      setDisabledCard(false);
      if (currentQuestionIndex === gameData.length - 2) {
        setShowNextButton(false);
      }
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const handleTestAgain = () => {
    setModalVisible(!modalVisible);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    trueAnswer = "";
    setDisabledCard(false);
    setProgress(new Animated.Value(0));
    setScore(0);
    setWrong(0);
    setShowNextButton(true);
  };
  //========= progress bar
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, gameData.length],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLOR.second}
      ></StatusBar>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/gameBackground2.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 16,
            // opacity: 0.6,
          }}
        >
          {/*---- progressBar ----*/}
          <View style={styles.progress}>
            {/* QuestionCounter */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: COLOR.second,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 50,
              }}
            >
              <MyText style={styles.text}>{currentQuestionIndex + 1}</MyText>
              <MyText style={styles.text}> / {gameData.length}</MyText>
            </View>
            <View
              style={{
                width: "60%",
                height: 20,
                borderRadius: 20,
                backgroundColor: COLOR.second,
              }}
            >
              <Animated.View
                style={[
                  {
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLOR.progress,
                  },
                  {
                    width: progressAnim,
                  },
                ]}
              ></Animated.View>
            </View>
            {/*--> close game ----*/}
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="close-circle-sharp"
                  size={40}
                  color={COLOR.second}
                  style={{ marginRight: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/*----  Point ----*/}
          <View style={styles.point}>
            <View
              style={{
                ...styles.pointPart,
                backgroundColor: "#f0fdf3",
              }}
            >
              <Feather
                name="check-circle"
                size={40}
                color={COLOR.success}
                style={{ marginRight: 5 }}
              />
              <MyText
                style={{
                  fontSize: 30,
                  color: COLOR.success,
                }}
                weight={900}
              >
                {score}
              </MyText>
            </View>
            <View
              style={{
                ...styles.pointPart,
                backgroundColor: "#fce4e5",
              }}
            >
              <Feather
                name="x-circle"
                size={40}
                color={COLOR.wrong}
                style={{ marginRight: 5 }}
              />
              <MyText
                style={{
                  fontSize: 30,
                  color: COLOR.wrong,
                }}
                weight={900}
              >
                {wrong}
              </MyText>
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
                    onPress={handlePress}
                    disabled={disabledCard}
                    style={{ backgroundColor: bgColor }}
                  ></GameCard>
                ) : (
                  <GameCard
                    key={item.id}
                    title={item.title}
                    index={index}
                    onPress={handlePress}
                    disabled={disabledCard}
                    // style={{ backgroundColor: "#fff" }}
                  ></GameCard>
                )
              )}
          </View>
          {/*---- Next Button ---*/}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNextQuestion}
              // disabled={currentQuestionIndex + 1 === gameData.length}
            >
              <MyText
                style={{ fontSize: 20, color: "#fff", textAlign: "center" }}
              >
                {showNextButton ? "Next" : "Close"}
              </MyText>
            </TouchableOpacity>
          </View>
          {/*------- MODAL -------*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  height: "70%",
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  padding: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/highScore.jpg")}
                    style={{ width: 150 }}
                    resizeMode="contain"
                  ></Image>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MyText style={{ marginBottom: 20 }}>
                    {score / gameData.length <= 0.4
                      ? RESULTS.first
                      : score / gameData.length <= 0.8
                      ? RESULTS.second
                      : RESULTS.third}
                  </MyText>
                  <MyText
                    style={{
                      fontSize: 16,
                      marginBottom: 10,
                    }}
                    weight={800}
                  >
                    Your score is:
                  </MyText>
                  <MyText
                    style={{
                      color: "#ffbd14",
                      fontSize: 20,
                    }}
                  >
                    <MyText style={{ color: "#4fd978" }} weight={800}>
                      {score} CORRECT
                    </MyText>{" "}
                    AND{" "}
                    <MyText style={{ color: "#ff7171" }} weight={800}>
                      {wrong} WRONG
                    </MyText>
                  </MyText>
                </View>
                <View
                  style={{
                    flex: 2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      ...styles.buttonMini,
                      backgroundColor: COLOR.second,
                    }}
                    onPress={handleTestAgain}
                  >
                    <MyText
                      style={{
                        color: COLOR.primary,
                        fontSize: 16,
                      }}
                      weight={700}
                    >
                      Test Again
                    </MyText>
                  </Pressable>
                  <Pressable
                    style={styles.buttonMini}
                    onPress={() => navigation.goBack()}
                  >
                    <MyText
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      weight={700}
                    >
                      Back to Setup
                    </MyText>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
  progress: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  main: {
    flex: 5,
    marginRight: -15,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    backgroundColor: COLOR.primary,
    padding: 20,
    borderRadius: 5,
  },
  buttonMini: {
    width: "70%",
    backgroundColor: COLOR.primary,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  point: {
    flex: 2,
    // width: 400,
    // height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 100,
    marginLeft: -100,
  },
  pointPart: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
});
