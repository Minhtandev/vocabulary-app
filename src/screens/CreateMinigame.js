import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
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
import Octicons from "react-native-vector-icons/Octicons";
import { db } from "../../config/firebase_config";
import handleGameQuestion from "../handle/handleGameQuestion";

// fakeDATA
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

const COLOR = {
  success: "#4fd978",
  wrong: "#de3f44",
  progress: "#0897ef",
  button: "#34b1fd",
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
      setErrorMess(`Number of questions must be less than ${arrVoc.length}`);
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

  const handleStartGame = () => {
    gameQuestion = handleGameQuestion(arrVoc, number);
    navigation.navigate("Minigame", {
      name: "Minigame",
      gameData: gameQuestion,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.setUp}>
        <Text style={styles.textTitle}>Setup game</Text>
        <View>
          <View style={styles.row}>
            <Octicons
              name="apps"
              size={20}
              color="#ff9f9f"
              style={{ marginRight: 10 }}
            />
            <Text style={{ marginRight: 10, fontSize: 16 }}>
              Choose subject
            </Text>
            <Menu>
              <MenuTrigger
                style={styles.menuTrigger}
                customStyles={{
                  triggerText: {
                    fontSize: 16,
                    width: 100,
                    textShadowColor: "#95cf4c",
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
                      <Text style={styles.menuText}>{item.name_subject}</Text>
                    </MenuOption>
                  ))}
              </MenuOptions>
            </Menu>
          </View>
          <View style={styles.row}>
            <Octicons
              name="number"
              size={20}
              color="#ff9f9f"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 16 }}>The number of questions</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(newText) => handleValidateNumberQuestion(newText)}
              value={number}
              placeholder="10"
            ></TextInput>
          </View>
          {errorMess && (
            <View style={styles.row}>
              <Text style={{ fontSize: 14, color: "red" }}>{errorMess}</Text>
            </View>
          )}
        </View>
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
        <Text style={{ color: "blue" }}>Introduction</Text>
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
            <View
              style={{
                width: "100%",
                height: "60%",
                borderRadius: 30,
                marginTop: "auto",
                backgroundColor: "#b5e67b",
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 10,
                      textShadowColor: COLOR.success,
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 20,
                    }}
                  >
                    CONNECT WORD
                  </Text>
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      English
                    </Text>
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Vietnamese
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flex: 2,
                  }}
                >
                  {lang && (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        - Player choose 2 cards: 1 English card and 1 Vietnamese
                        card to make a correct vocabulary word with it's
                        definition.
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        - Click card twice in a row to deselect it.
                      </Text>
                    </>
                  )}
                  {!lang && (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        - Người chơi chọn 2 thẻ: 1 thẻ tiếng anh và 1 thẻ tiếng
                        việt để tạo thành một từ vựng tiếng anh với nghĩa đúng
                        của nó.
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        - Nhấn 2 lần liên tiếp vào 1 thẻ để bỏ chọn thẻ đó.
                      </Text>
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
                      borderColor: COLOR.button,
                      paddingVertical: 12,
                    }}
                    borderWidth={1}
                    onPress={() => setShowModal(false)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: COLOR.button,
                        fontSize: 16,
                      }}
                    >
                      Close
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      ...styles.buttonMini,
                      width: "46%",
                      paddingVertical: 12,
                    }}
                    onPress={handleStartGame}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                        fontSize: 16,
                      }}
                    >
                      Start game
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
      {/* --- end modal */}
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={handleStartGame}
          style={{
            ...styles.btn,
            backgroundColor: "#b6e17d",
            borderWidth: 1,
            borderColor: "#FF9F9F",
          }}
        >
          <Text style={styles.textBtn}>Start game</Text>
        </Pressable>
      </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
  input: {
    width: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#76b42e",
  },
  menu: {},
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
    backgroundColor: "#34b1fd",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
