//Của react và react native
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

//Của components
import { CustomModal } from "./CustomModal";

import { db } from "../../../config/firebase_config";
import { doc, updateDoc } from "firebase/firestore";

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

export const CardItem = ({ navigation, name, defi, id, subjectId, favo }) => {
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
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate("FlashcardDetail", {
          name: "FlashcardDetail",
          subjectId: id,
        })
      }
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.small}>{defi}</Text>
      <View style={styles.icons_bar}>
        <AntDesign
          name="sound"
          size={18}
          color="white"
          onPress={voiceHandle}
          style={styles.sound_icon}
        />
        {favo == true ? (
          <AntDesign name="heart" size={18} color="red" onPress={changeFavo} />
        ) : (
          <AntDesign
            name="hearto"
            size={18}
            color="white"
            onPress={changeFavo}
          />
        )}
      </View>
      <Menu>
        <MenuTrigger
          // style={styles.dots}
          customStyles={{
            TriggerTouchableComponent: Pressable,
            triggerTouchable: { title: "Select (Custom Touchables)" },
            triggerOuterWrapper: styles.practice_btn,
            triggerText: styles.practice_btn_text,
            // triggerWrapper: styles.dots,
          }}
          // children={
          // <Pressable onPress={() => {}} style={styles.dots_content}>
          // <Entypo name="dots-three-vertical" size={18} color="white" />
          // </Pressable>
          // }
          text="THAO TÁC"
        />
        <MenuOptions style={styles.menu_container}>
          {/* <MenuOption
            onSelect={() => setAddCardModalVisible(true)}
            style={styles.menu_option}
          >
            <Entypo
              name="plus"
              size={16}
              color="white"
              style={styles.menu_add_icon}
            />
            <Text style={styles.menu_text}>Thêm</Text>
          </MenuOption> */}
          <MenuOption
            onSelect={() => setEditModalVisible(true)}
            style={styles.menu_option}
          >
            <Entypo
              name="edit"
              size={16}
              color="white"
              style={styles.menu_edit_icon}
            />
            <Text style={styles.menu_text}>Chỉnh sửa</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => setDeleteModalVisible(true)}
            style={styles.menu_option}
          >
            <MaterialIcons
              name="delete"
              size={16}
              color="white"
              style={styles.menu_delete_icon}
            />
            <Text style={styles.menu_text}>Xóa</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
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
    // flex: 1,
    backgroundColor: "#4d4d4d",
    width: width * 0.45,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 10,
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

  //button
  add_btn: {
    backgroundColor: "#5F9DF7",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 130,
    marginTop: 10,
    marginBottom: 5,
  },
  practice_btn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#5F9DF7",
    borderStyle: "solid",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 130,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
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
    marginLeft: 3,
    marginRight: 5,
    marginTop: 3,
  },
  menu_delete_icon: {
    marginLeft: 3,
    marginRight: 5,
    marginTop: 3,
  },
  sound_icon: {
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  //text
  small: {
    fontSize: 12,
    color: "#D8D9CF",
  },
  add_btn_text: {
    color: "#FFF",
    fontWeight: "500",
  },
  practice_btn_text: {
    color: "#5F9DF7",
    textAlign: "center",
    fontWeight: "500",
  },
  name: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  menu_text: {
    color: "#FFF",
  },
});
