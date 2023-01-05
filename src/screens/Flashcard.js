//Của react và react native
import React, { useState, useEffect, useContext } from "react";
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
import MyText from "../components/MyText";
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
import { useUser } from "../context/userContext";

export const Flashcard = ({ navigation, route }) => {
  //Các state
  const [subjectArrState, setSubjetArrState] = useState([]);
  // const [favourite, setFavourite] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //database
  const collectionRef = collection(db, "flashcard_subject");

  //
  const userContext = useUser();
  //Biến id của user
  const userId = userContext.user?.userId;
  // console.log("flashcard >>>", userId);
  //lấy dữ liệu (các bộ)
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        const favourite = {
          id: "favourite",
          name: "Yêu thích",
          desc: "Các Flashcard bạn yêu thích",
          user: userId,
        };
        setSubjetArrState(
          [
            ...snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter((item) => item.user == userId)
              .sort((a, b) => a.name.localeCompare(b.name)),
            favourite,
          ]
          // .push(favourite)
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
        {/* <MyText weight={700} style={styles.title}>
          CÁC BỘ FLASHCARD
        </MyText> */}
        {/* Render các item */}
        {/* <Item
          navigation={navigation}
          style={styles.item}
          name={"Yêu thích"}
          desc={"Các Flashcard bạn yêu thích"}
          userId={userId}
          id={"favourite"}
        ></Item> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={subjectArrState}
          renderItem={({ item }) => (
            <Item
              navigation={navigation}
              style={styles.item}
              name={item.name}
              desc={item.desc}
              id={item.id}
              userId={userId}
              subjectArr={subjectArrState}
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
            <MyText weight={500} style={styles.add_btn_text}>
              THÊM BỘ
            </MyText>
          </View>
        </Pressable>
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
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "rgba(132, 105, 255, 0.3)",
    // color: "#FFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  add_btn_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
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
    backgroundColor: "#8469ff",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    // width: 110,
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
    marginRight: 2,
  },

  //text
  title: {
    color: "#000000",
    fontSize: 20,
  },
  add_btn_text: {
    color: "#FFF",
    fontSize: 18,
  },
});
