//Của react và react native
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";

//Của components
import { CustomModal } from "./CustomModal";

import { db } from "../../../config/firebase_config";
import { doc, updateDoc } from "firebase/firestore";
import MyText from "../MyText";
//Của thư viện
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
var width = Dimensions.get("window").width;
import image from "../../../assets/flashcard_item_bg.jpg";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
export const CardItem = ({ navigation, name, defi, id, subjectId, favo }) => {
  //âm thanh khi thêm thành công
  const [sound, setSound] = useState();
  async function playSoundTrue() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/correct-answer.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const voiceHandle = () => {
    // console.log("hello");
    Speech.speak(name, { language: "en" });
  };

  const changeFavo = async () => {
    const userDoc = doc(db, "flashcard", id);
    const newFields = {
      name: name,
      defi: defi,
      favo: !favo,
    };
    await updateDoc(userDoc, newFields);
    if (favo == false) {
      Toast.show({
        type: "success",
        text1: "Thêm thành công",
        text2: "Đã thêm vào bộ yêu thích!!!👋",
      });
      playSoundTrue();
    } else {
      Toast.show({
        type: "success",
        text1: "Xóa thành công",
        text2: "Đã xóa khỏi bộ yêu thích!!!",
      });
      playSoundTrue();
    }
    setFavoState(!favo);
  };

  // const editCard = async (id) => {
  //   const userDoc = doc(db, "flashcard", id);
  //   const newFields = {
  //     name: inputNameCardState,
  //     defi: inputDefiState,
  //   };
  //   await updateDoc(userDoc, newFields);
  // };
  //Các state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [favoState, setFavoState] = useState(favo);

  return (
    <Pressable style={styles.item}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <MyText weight={700} style={styles.name}>
        {name}
      </MyText>
      <MyText style={styles.small}>{defi}</MyText>
      <View style={styles.icons_bar}>
        <AntDesign
          name="sound"
          size={24}
          onPress={voiceHandle}
          style={styles.sound_icon}
        />
        {favo == true ? (
          <AntDesign name="heart" size={24} color="red" onPress={changeFavo} />
        ) : (
          <AntDesign
            name="hearto"
            size={22}
            color="#8469ff"
            onPress={changeFavo}
          />
        )}
      </View>
      <View style={styles.btns_container}>
        <Pressable
          style={styles.edit_btn}
          onPress={() => setEditModalVisible(true)}
        >
          <Entypo
            name="edit"
            style={{ ...styles.menu_edit_icon, ...styles.edit_btn_text }}
          />
          <MyText weight={500} style={styles.edit_btn_text}>
            Chỉnh Sửa
          </MyText>
        </Pressable>
        <Pressable
          style={styles.delete_btn}
          onPress={() => setDeleteModalVisible(true)}
        >
          <MaterialIcons
            name="delete"
            style={{ ...styles.menu_delete_icon, ...styles.delete_btn_text }}
          />
          <MyText weight={500} style={styles.delete_btn_text}>
            Xóa
          </MyText>
        </Pressable>
      </View>
      <CustomModal
        modalType="delete-card"
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        idCard={id}
        nameCard={name}
        defi={defi}
        favo={favo}
      ></CustomModal>
      <CustomModal
        modalType="edit-card"
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        idCard={id}
        nameCard={name}
        defi={defi}
        favo={favo}
      ></CustomModal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  //view
  item: {
    // backgroundColor: "#faf4b7",
    backgroundColor: "#f0edff",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#8469ff",
    width: width * 0.8,
    marginTop: 160,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    // paddingLeft: 15,
    // paddingTop: 15,
    // paddingBottom: 10,
  },
  add_btn_content: {
    flexDirection: "row",
    flex: 1,
    alignItem: "center",
  },
  menu_container: {
    width: 150,
    position: "absolute",
    right: 0,
    top: -50,
  },
  icons_bar: {
    flexDirection: "row",
    alignItems: "center",
  },
  btns_container: {
    // flexDirection: "row",
  },

  //button
  add_btn: {
    backgroundColor: "#8469ff",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 130,
    marginTop: 10,
    marginBottom: 5,
  },
  delete_btn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#8469ff",
    borderStyle: "solid",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 90,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8469ff",
  },
  edit_btn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#8469ff",
    borderStyle: "solid",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 150,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8469ff",
  },
  dots: {
    backgroundColor: "#FF0000",
    position: "absolute",
    right: 30,
    top: 25,
    width: 50,
    height: 50,
  },
  menu_option: {
    backgroundColor: "#000000",
    flexDirection: "row",
    height: 40,
    lineHeight: 40,
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
    marginRight: 5,
    marginTop: 3,
  },
  menu_add_icon: {
    marginLeft: 3,
    marginRight: 5,
    marginTop: 3,
  },
  menu_edit_icon: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 2,
  },
  menu_delete_icon: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 2,
  },
  sound_icon: {
    color: "#8469ff",
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  //text
  small: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 40,
  },
  add_btn_text: {
    color: "#8469ff",
    // fontWeight: "500",
  },
  delete_btn_text: {
    color: "#FFFFFF",
    textAlign: "center",
    // fontWeight: "500",
    fontSize: 20,
  },
  edit_btn_text: {
    color: "#FFFFFF",
    textAlign: "center",
    // fontWeight: "500",
    fontSize: 20,
  },
  name: {
    color: "#000000",
    fontSize: 30,
    // fontWeight: "700",
  },
  menu_text: {
    color: "#000000",
  },
});
