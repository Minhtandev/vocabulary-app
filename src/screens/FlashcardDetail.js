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

  //Biến id của bộ
  const subjectId = route.params.subjectId;
  //lấy dữ liệu (các thẻ)
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setSubjetArrState(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.subject == subjectId)
        );
      }),
    []
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        {/* <Text>{route.params.subjectId}</Text> */}
        {/* <FlatList
        data={subjectArrState}
        // style={styles.cardlist}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <CardItem
            navigation={navigation}
            name={item.name}
            defi={item.defi}
            favo={item.favo}
            id={item.id}
            // subjectId={route.params.subjectId}
          ></CardItem>
        )}
      /> */}
        <Carousel
          // ref={(c) => {
          //   this._carousel = c;
          // }}
          layout={"stack"}
          layoutCardOffset={18}
          data={subjectArrState}
          renderItem={({ item }) => (
            <CardItem
              navigation={navigation}
              name={item.name}
              defi={item.defi}
              favo={item.favo}
              id={item.id}
              // subjectId={route.params.subjectId}
            ></CardItem>
          )}
          sliderWidth={700}
          itemWidth={300}
        />
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
            <Text style={styles.add_btn_text}>THÊM THẺ</Text>
          </View>
        </Pressable>
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
    color: "#FFF",
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
