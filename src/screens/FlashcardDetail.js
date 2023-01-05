//Của react và react native
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import MyText from "../components/MyText";
//Của database
import { db } from "../../config/firebase_config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

//Của các components
import { CardItem } from "../components/flashcard/CardItem";
import { CustomModal } from "../components/flashcard/CustomModal";

//Của các thư viện
import { MenuProvider } from "react-native-popup-menu";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import image from "../../assets/flashcard_background.jpg";

export const FlashcardDetail = ({ navigation, route }) => {
  //Các state
  const [subjectArrState, setSubjetArrState] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //database
  const collectionRef = collection(db, "flashcard");

  //Biến truyền Item bộ
  const subjectId = route.params.subjectId;
  const subjectName = route.params.subjectName;
  const subjectIdArr = route.params.subjectArr
    ? route.params.subjectArr.map((item) => item.id)
    : [];
  // console.log("params.subjectArr>>>", route.params.subjectArr);
  //lấy dữ liệu (các thẻ)
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        if (subjectId != "favourite") {
          setSubjetArrState(
            snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter((item) => item.subject == subjectId)
          );
        } else {
          setSubjetArrState(
            snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter((item) => item.favo == true)
              .filter((item) => subjectIdArr.includes(item.subject))
          );
        }
      }),
    []
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        {subjectArrState.length > 0 ? (
          <Carousel
            layout={"stack"}
            layoutCardOffset={18}
            data={subjectArrState.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({ item }) => (
              <CardItem
                navigation={navigation}
                name={item.name}
                defi={item.defi}
                favo={item.favo}
                id={item.id}
              ></CardItem>
            )}
            sliderWidth={700}
            itemWidth={300}
          />
        ) : (
          <MyText weight={500} style={styles.exception_text}>
            Chưa có thẻ nào hết bạn ơi &#128517;
          </MyText>
        )}
        {subjectId != "favourite" ? (
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
                THÊM THẺ
              </MyText>
            </View>
          </Pressable>
        ) : (
          <></>
        )}
        <CustomModal
          modalType="add-card"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          subjectIdToAdd={subjectId}
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
    // paddingBottom: 10,
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    backgroundColor: "rgba(132, 105, 255, 0.3)",

    color: "#FFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  add_btn_content: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#4d4d4d",
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
  cardlist: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  add_subject_btn: {
    backgroundColor: "#8469ff",
    borderRadius: 50,
    paddingTop: 5,
    // paddingLeft: 5,
    paddingBottom: 5,
    // paddingRight: 5,
    paddingHorizontal: 10,
    // width: 115,
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
    // marginLeft: 5,
    marginRight: 2,
    // marginTop: 2,
  },
  //text
  title: {
    color: "#000000",
    fontSize: 20,
    // marginTop: 15,
    position: "relative",
    top: 100,
    textTransform: "uppercase",
  },
  add_btn_text: {
    color: "#FFF",
    fontSize: 18,
    // fontWeight: "500",
  },
  exception_text: {
    fontSize: 20,
    marginTop: 250,
  },
});
