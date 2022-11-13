import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressablem,
  Image,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase_config";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const DATA = [
  {
    id: "001",
    name: "color",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "002",
    name: "animal",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "003",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "004",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "005",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "006",
    name: "color",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "007",
    name: "animal",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "008",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "009",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "010",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
];

const Item = ({ name, setModalVisible, route }) => (
  <Pressable style={styles.item} onPress={() => setModalVisible(true)}>
    <Entypo name="add-to-list" size={24} color="black" />
    <View>
      <Text style={styles.title}>{name}</Text>
    </View>
    <Pressable style={styles.infor}>
      <AntDesign name="arrowright" size={24} color="black" />
    </Pressable>
  </Pressable>
);

export const Vocabulary = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const collectionRef = collection(db, "card");
  const [cardArrState, setCardArrState] = useState([]);

  //Biến id của bộ
  const subjectId = route.params.subjectId;

  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setCardArrState(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.subject == subjectId)
        );
      }),
    []
  );

  return (
    <View style={styles.cover}>
      <FlatList
        data={cardArrState}
        renderItem={({ item }) => (
          <Item
            // navigation={navigation}
            name={item.name_card}
            // symbol={item.symbol}
            setModalVisible={() => setModalVisible(true)}
          ></Item>
        )}
      />

      <Modal
        style={styles.modal}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.nameCard}> Chicken </Text>
        <Text style={styles.ipa}> /ˈtʃɪk.ɪn/ </Text>
        <Text style={styles.meanViet}> Con gà </Text>
        <Text style={styles.meanEng}>
          a type of bird kept on a farm for its eggs or its meat, or the meat of
          this bird that is cooked and eaten
        </Text>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/f2/77/d2/f277d2162da9af687fa7182f8dd2ecca.jpg",
          }}
          style={styles.imageCard}
        />
        <Pressable
          onPress={() => setModalVisible(false)}
          style={[styles.button, styles.buttonOpen]}
        >
          <Text>x</Text>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: "100%",
    backgroundColor: "#d7f8fa",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: "80%",
    height: 80,
    padding: 30,
    borderRadius: 50,
    backgroundColor: "#65a9c2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    marginLeft: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    height: "200%",
    marginTop: 15,
    justifyContent: "center",
  },
  symbol: {
    color: "#3a464a",
  },
  addList: {},
  infor: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f5f7",
    borderRadius: 50,
  },
  modal: {
    display: "flex",
    backgroundColor: "#fcf9de",
    position: "absolute",
    marginTop: "30%",
    marginLeft: "13%",
    alignItems: "center",
    borderRadius: 10,
    height: "60%",
    width: "70%",
  },
  nameCard: {
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#f7c911",
    justifyContent: "center",
    alignItems: "center",
  },
  ipa: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#8a8986",
  },
  meanViet: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  meanEng: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontStyle: "italic",
    fontSize: 12,
  },
  imageCard: {
    width: 200,
    height: 200,
    marginTop: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
});
