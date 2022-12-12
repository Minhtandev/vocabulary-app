//Của react và react native
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  Button,
  ImageBackground,
} from "react-native";

//Của các components
import { Item } from "../components/flashcard/Item";
import { CustomModal } from "../components/flashcard/CustomModal";
import image from "../../assets/flashcard_background.jpg";
//Của database
import { db } from "../../config/firebase_config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

//Các thư viện
import { MenuProvider } from "react-native-popup-menu";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export const Flashcard = ({ navigation, route }) => {
  //Các state
  const [subjectArrState, setSubjetArrState] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //database
  const collectionRef = collection(db, "flashcard_subject");

  //Biến id của user
  const userId = route.params.userId;
  console.log("flashcard >>>", userId);
  //lấy dữ liệu (các bộ)
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setSubjetArrState(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.user == userId)
        );
      }),
    []
  );

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // playSound();
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        {/* Render các item */}
        <FlatList
          data={subjectArrState}
          renderItem={({ item }) => (
            <Item
              navigation={navigation}
              style={styles.item}
              name={item.name}
              desc={item.desc}
              id={item.id}
              userId={userId}
            ></Item>
          )}
        />
        {/* Nút thêm bộ */}
        <Pressable
          style={styles.add_subject_btn}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.add_btn_content}>
            <Entypo
              name="plus"
              size={16}
              color="white"
              style={styles.add_icon}
            />
            <Text style={styles.add_btn_text}>THÊM BỘ</Text>
            {/* <Text style={styles.add_btn_text}>{userId}</Text> */}
          </View>
        </Pressable>
        {/* <Button title="Play Sound" onPress={playSound} /> */}
        {/* Modal thêm bộ */}
        <CustomModal
          modalType="add-subject"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          userId={userId}
        ></CustomModal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //view
  container: {
    flex: 1,
    paddingTop: 10,
    // paddingBottom: 0,
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    // color: "#FFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  add_btn_content: {
    flexDirection: "row",
    flex: 1,
    alignItem: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  add_subject_btn: {
    backgroundColor: "#5F9DF7",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 110,
    position: "absolute",
    bottom: 15,
  },

  //input
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  //icon
  add_icon: {
    marginLeft: 5,
    marginRight: 2,
    marginTop: 1,
  },

  //text
  add_btn_text: {
    color: "#FFF",
    fontWeight: "500",
  },
});
