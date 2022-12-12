import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import image from "../../assets/backgroundVoc.jpg";
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

const Item = ({ navigation, name, setModalVisible, index, id }) => (
  <Pressable
    style={styles.topic}
    onPress={() => {
      navigation.navigate("Vocabulary", {
        name: "Vocabulary",
        subjectId: id,
      });
    }}
  >
    <View style={styles.indexTopic}>
      <Text style={{ color: "#000", fontWeight: "700" }}>{index}</Text>
    </View>

    <View style={styles.contentTopic}>
      <Text style={styles.nameTopic}> {name} </Text>
    </View>
  </Pressable>
);

export const LearnVoc = ({ navigation, route }) => {
  // const [topicPress, setTopicPress] = useState(0);
  // Lấy dữ liệu
  const collectionRef = collection(db, "subject");
  const [subjectArrState, setSubjetArrState] = useState([]);

  // Lấy bộ
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setSubjetArrState(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.body}>
        {/* <View style={TEXT}><FontAwesome5 name="bell" size={24} color="black" /></View> */}
        <View style={styles.cover}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            horizontal={false}
            data={subjectArrState}
            renderItem={({ index, item }) => (
              <Item
                navigation={navigation}
                name={item.name_subject}
                id={item.id}
                index={index + 1}
              ></Item>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const topics = [
  {
    index: 1,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 2,
    name: "topic2",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 3,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 4,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 5,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 6,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 7,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
];
const TEXT = {
  color: "#1E5128",
};
const styles = StyleSheet.create({
  body: {
    height: "100%",
    top: 0,
    margin: 0,
    padding: 0,
  },
  header: {
    alignItems: "flex-end",
  },
  cover: {
    height: "100%",
    marginLeft: "15%",
    marginRight: "15%",
  },
  flatlist: {
    justifyContent: "space-between",
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D2DAFF",
    borderColor: "#000",
    borderWidth: 2,
    borderStyle: "solid",
    height: 100,
    width: "45%",
    marginTop: 10,
    borderRadius: 16,
    justifyContent: "flex-start",
  },
  indexTopic: {
    backgroundColor: "#b6e0f8",
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    marginLeft: 5,
    marginTop: -60,
    borderColor: "#000",
    borderWidth: 2,
    borderStyle: "solid",
  },
  contentTopic: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  nameTopic: {
    ...TEXT,
    fontSize: 20,
    fontWeight: "700",
  },
  translate: {
    color: "#aaa",
  },
});
