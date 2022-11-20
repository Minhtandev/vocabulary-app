import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
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

const CreateMinigame = ({ navigation }) => {
  const [subjectArrState, setSubjectArrState] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [arrVoc, setArrVoc] = useState([]);

  const [number, setNumber] = useState(10);
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
  }, [selectedSubject]);

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
        <Text style={styles.textTitle}>Setting game</Text>
        <View>
          <View style={styles.row}>
            <Octicons
              name="apps"
              size={20}
              color="#ff9f9f"
              style={{ marginRight: 10 }}
            />
            <Text style={{ marginRight: 10, fontSize: 16 }}>
              Chọn bộ từ vựng
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
                      onSelect={() => setSelectedSubject(item.name_subject)}
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
            <Text style={{ fontSize: 16 }}>Chọn số câu hỏi</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(newText) => {
                setNumber(newText);
              }}
              value={number}
              placeholder="10"
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={handleStartGame}
          style={{ ...styles.btn, backgroundColor: "#b6e17d" }}
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
    // backgroundColor: "#1e1d2f",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
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
    borderColor: "##76b42e",
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
});
