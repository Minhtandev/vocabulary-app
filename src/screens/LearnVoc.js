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
import MyText from "../components/MyText";
import { useUser } from "../context/userContext";
const Item = ({
  navigation,
  name,
  setModalVisible,
  index,
  id,
  onPress = () => {},
}) => (
  <Pressable
    style={styles.topic}
    onPress={() => {
      onPress();
      navigation.navigate("Vocabulary", {
        name: "Vocabulary",
        subjectId: id,
        subjectName: name,
      });
    }}
  >
    <View style={styles.indexTopic}>
      <MyText weight={700} style={{ color: "#000" }}>
        {index}
      </MyText>
    </View>

    <View style={styles.contentTopic}>
      <MyText weight={700} style={styles.nameTopic}>
        {" "}
        {name}{" "}
      </MyText>
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

  // --- bộ từ vựng mới học
  const userContext = useUser();
  // Lấy dữ liệu
  const collectionRef_laSubject = collection(db, "latest_subject");

  //

  const handleSetLatestSubject = async (id, name) => {
    console.log(76, id, name);
    console.log("userId", userContext.user.userId);

    const querySnapshot = await getDocs(collection(db, "latest_subject"));
    const data = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .find((item) => item.userId === userContext.user.userId);
    if (data) {
      const userDoc = doc(db, "latest_subject", data.id);
      deleteDoc(userDoc);
    }

    //
    await addDoc(collectionRef_laSubject, {
      userId: userContext.user.userId,
      subjectId: id,
      subjectName: name,
    });
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.body}>
        {/* <View style={TEXT}><FontAwesome5 name="bell" size={24} color="black" /></View> */}
        <View style={styles.cover}>
          <FlatList
            // numColumns={2}
            // columnWrapperStyle={{ justifyContent: "space-between" }}
            // horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={subjectArrState.sort((a, b) =>
              a.name_subject.localeCompare(b.name_subject)
            )}
            renderItem={({ index, item }) => (
              <Item
                navigation={navigation}
                name={item.name_subject}
                id={item.id}
                index={index + 1}
                onPress={() =>
                  handleSetLatestSubject(item.id, item.name_subject)
                }
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
  color: "#000",
};
const styles = StyleSheet.create({
  body: {
    height: "100%",
    margin: 0,
    padding: 0,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "rgba(132, 105, 255, 0.3)",
  },
  header: {
    alignItems: "flex-end",
  },
  cover: {
    height: "100%",
    marginLeft: "15%",
    marginRight: "15%",
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0edff",
    borderColor: "#000",
    borderWidth: 2,
    borderStyle: "solid",
    height: 100,
    width: "100%",
    marginTop: 20,
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
    // fontWeight: "700",
  },
  translate: {
    color: "#aaa",
  },
});
