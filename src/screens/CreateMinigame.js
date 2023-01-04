import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Feather from "react-native-vector-icons/Feather";
import { db } from "../../config/firebase_config";
import MyText from "../components/MyText";
import handleGameQuestion from "../handle/handleGameQuestion";

import image from "../../assets/gameBg1.jpg";

const COLOR = {
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
};

const CreateMinigame = ({ navigation }) => {
  // mở modal hướng dẫn
  const [showModal, setShowModal] = useState(false);
  // true là tiếng anh, false là tiếng việt
  const [lang, setLang] = useState(false);
  // các bộ từ vựng
  const [subjectArrState, setSubjectArrState] = useState([]);
  // ID bộ từ vựng được chọn
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  // bộ từ vựng được chọn
  const [selectedSubject, setSelectedSubject] = useState("");
  // danh sách các từ của bộ từ vựng
  const [arrVoc, setArrVoc] = useState([]);
  // số câu hỏi
  const [number, setNumber] = useState(10);
  // lỗi
  const [errorMess, setErrorMess] = useState("");
  // danh sách câu hỏi của game
  let gameQuestion = [];
  //database
  const collectionRef = collection(db, "subject");
  const collRef = collection(db, "card");

  //lấy dữ liệu (các bộ)
  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSubjectArrState(data);
      setSelectedSubject(data[0]?.name_subject || "botunek");
      setSelectedSubjectId(data[0]?.id || "idnek");
    });
  }, []);
  //  lấy từ vựng của bộ
  useEffect(() => {
    onSnapshot(collRef, (snapshot) => {
      setArrVoc(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((item) => item.subject === selectedSubjectId)
      );
    });
  }, [selectedSubjectId]);

  // xử lý chọn bộ từ vựng
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject.name_subject);
    setSelectedSubjectId(subject.id);
  };

  // xử lý số câu hỏi
  const handleValidateNumberQuestion = (newText) => {
    if (arrVoc.length < Number(newText)) {
      setNumber(arrVoc.length);
      setErrorMess(
        `Number of questions must be not more than ${arrVoc.length}`
      );
    } else {
      if (!newText) setNumber(10);
      else setNumber(newText);
      setErrorMess("");
    }
  };
  // xử lý đóng phần introduction
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // xử lý bắt đầu game
  const handleStartGame = () => {
    gameQuestion = handleGameQuestion(arrVoc, number);
    navigation.navigate("Minigame", {
      name: "Minigame",
      gameData: gameQuestion,
    });
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.setUp}>
          <MyText style={styles.textTitle}>Setup game</MyText>
          <View style={{ flex: 1 }}>
            <View style={styles.group}>
              <View style={styles.row}>
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require("../../assets/icons/menu.png")}
                />
                <MyText style={{ marginRight: 10, fontSize: 16 }}>
                  Choose subject
                </MyText>
              </View>
              <Menu>
                <MenuTrigger
                  style={styles.menuTrigger}
                  customStyles={{
                    triggerText: {
                      fontSize: 16,
                      width: 100,
                      textShadowColor: COLOR.primary,
                      textShadowOffset: { width: 5, height: 5 },
                      textShadowRadius: 10,
                    },
                    triggerWrapper: {
                      padding: 5,
                      border: 1,
                      // backgroundColor: "blue",
                    },
                    triggerTouchable: { title: "Select (Custom Touchables)" },
                  }}
                  text={selectedSubject}
                />
                <MenuOptions style={styles.menuContainer}>
                  {subjectArrState.length > 0 &&
                    subjectArrState.map((item, index) => (
                      <MenuOption
                        key={index}
                        onSelect={() => handleSelectSubject(item)}
                        style={styles.menuOption}
                      >
                        <MyText style={styles.menuText}>
                          {item.name_subject}
                        </MyText>
                      </MenuOption>
                    ))}
                </MenuOptions>
              </Menu>
            </View>
            <View style={styles.group}>
              <View style={styles.row}>
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require("../../assets/icons/numbers.png")}
                />
                <MyText style={{ fontSize: 16 }}>
                  The number of questions
                </MyText>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(newText) =>
                  handleValidateNumberQuestion(newText)
                }
                value={number}
                placeholder="10"
              ></TextInput>
            </View>
            {errorMess && (
              <View style={styles.row}>
                <MyText style={{ fontSize: 14, color: "red" }}>
                  {errorMess}
                </MyText>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Pressable
            onPress={handleStartGame}
            style={{
              ...styles.btn,
              backgroundColor: COLOR.primary,
              borderWidth: 1,
              borderColor: COLOR.second,
            }}
          >
            <MyText style={{ ...styles.textBtn, color: "#fff" }} weight={900}>
              Start game
            </MyText>
          </Pressable>
        </View>
        {/* huong dan */}
        <Pressable
          style={{
            width: "32%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            position: "absolute",
            bottom: 0,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            elevation: 5,
          }}
          onPress={() => setShowModal(true)}
        >
          <MyText style={{ color: "blue" }}>Introduction</MyText>
          <Feather
            name="info"
            size={20}
            color="blue"
            style={{ marginLeft: 10 }}
          />
        </Pressable>
        {showModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              Alert.alert("Closed.");
              setModalVisible(false);
            }}
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleCloseModal}
            >
              <Pressable
                style={{
                  width: "100%",
                  height: "60%",
                  borderRadius: 30,
                  marginTop: "auto",
                  backgroundColor: COLOR.primary,
                  justifyContent: "space-evenly",
                  alignItems: "baseline",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    marginTop: 10,
                    backgroundColor: "#fff",
                    padding: 30,
                    justifyContent: "space-evenly",
                    alignItems: "baseline",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <MyText
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        textShadowColor: COLOR.primary,
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 20,
                      }}
                      weight={900}
                    >
                      CONNECT WORD
                    </MyText>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      // height: 50,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "#ededed",
                      backgroundColor: "#efefef",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 4,
                      marginTop: 0,
                      marginBottom: 30,
                    }}
                  >
                    <Pressable
                      style={{
                        flex: 1,
                        backgroundColor: lang ? "#fff" : "transparent",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                      borderRadius={10}
                      onPress={() => setLang(true)}
                    >
                      <MyText
                        style={{
                          fontSize: 16,
                        }}
                        weight={900}
                      >
                        English
                      </MyText>
                    </Pressable>
                    <Pressable
                      style={{
                        flex: 1,
                        backgroundColor: !lang ? "#fff" : "transparent",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                      borderRadius={10}
                      onPress={() => setLang(false)}
                    >
                      <MyText
                        style={{
                          fontSize: 16,
                        }}
                        weight={900}
                      >
                        Vietnamese
                      </MyText>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flex: 2,
                    }}
                  >
                    {lang && (
                      <>
                        <MyText
                          style={{
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                        >
                          - Player chooses 2 cards: 1 English card and 1
                          Vietnamese card to make a correct vocabulary word with
                          it's definition.
                        </MyText>
                        <MyText
                          style={{
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                        >
                          - Click card twice in a row to remove the selection.
                        </MyText>
                      </>
                    )}
                    {!lang && (
                      <>
                        <MyText
                          style={{
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                        >
                          - Người chơi chọn 2 thẻ: 1 thẻ tiếng anh và 1 thẻ
                          tiếng việt để tạo thành một từ vựng tiếng anh với
                          nghĩa đúng của nó.
                        </MyText>
                        <MyText
                          style={{
                            fontSize: 16,
                            marginBottom: 10,
                          }}
                        >
                          - Nhấn 2 lần liên tiếp vào 1 thẻ để bỏ chọn thẻ đó.
                        </MyText>
                      </>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      style={{
                        ...styles.buttonMini,
                        width: "46%",
                        backgroundColor: "#fff",
                        borderColor: COLOR.primary,
                        paddingVertical: 12,
                      }}
                      borderWidth={1}
                      onPress={() => setShowModal(false)}
                    >
                      <MyText
                        style={{
                          color: COLOR.primary,
                          fontSize: 16,
                        }}
                        weight={900}
                      >
                        Close
                      </MyText>
                    </Pressable>
                    <Pressable
                      style={{
                        ...styles.buttonMini,
                        width: "46%",
                        paddingVertical: 12,
                      }}
                      onPress={handleStartGame}
                    >
                      <MyText
                        style={{
                          color: "#fff",
                          fontSize: 16,
                        }}
                        weight={900}
                      >
                        Start game
                      </MyText>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        )}
        {/* --- end modal */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateMinigame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0edff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
    position: "relative",
  },
  setUp: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 20,
  },
  textTitle: {
    fontSize: 28,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
  input: {
    fontSize: 16,
    width: 100,
    height: 44,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: COLOR.primary,
    backgroundColor: COLOR.second,
  },
  menu: {},
  menuTrigger: {
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: COLOR.second,
    borderColor: COLOR.primary,
    marginLeft: 50,
  },
  menuContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuOption: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
  },
  // modal
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
});
