//Của react và react native
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

//Của components khác
import { CustomModal } from "./CustomModal";

//Của thư viện
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
// import * as Speech from "expo-speech";

//Lấy width của window
var width = Dimensions.get("window").width;

export const Item = ({ navigation, name, desc, id }) => {
  // const voiceHandle = () => {
  //   console.log("hello");
  //   const thingToSay = "Hello";
  //   Speech.speak(thingToSay);
  // };

  //Các state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
      {/* <Text>{id}</Text> */}
      <Menu>
        <MenuTrigger style={styles.dots}>
          <Entypo name="dots-three-vertical" size={18} color="white" />
        </MenuTrigger>
        <MenuOptions style={styles.menu_container}>
          <MenuOption onSelect={() => alert(`Thêm`)} style={styles.menu_option}>
            <Entypo
              name="plus"
              size={16}
              color="white"
              style={styles.menu_add_icon}
            />
            <Text style={styles.menu_text}>Thêm</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Sửa`)} style={styles.menu_option}>
            <Pressable
              style={{ flexDirection: "row" }}
              onPress={() => setEditModalVisible(true)}
            >
              <Entypo
                name="edit"
                size={16}
                color="white"
                style={styles.menu_edit_icon}
              />
              <Text style={styles.menu_text}>Chỉnh sửa</Text>
            </Pressable>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Xóa`)} style={styles.menu_option}>
            <Pressable
              style={{ flexDirection: "row" }}
              onPress={() => setDeleteModalVisible(true)}
            >
              <MaterialIcons
                name="delete"
                size={16}
                color="white"
                style={styles.menu_delete_icon}
              />
              <Text style={styles.menu_text}>Xóa</Text>
            </Pressable>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.small}>{desc}</Text>
      <Pressable style={styles.add_btn}>
        <View style={styles.add_btn_content}>
          <Entypo name="plus" size={16} color="white" style={styles.add_icon} />
          <Text style={styles.add_btn_text}>THÊM THẺ</Text>
        </View>
      </Pressable>
      <Pressable style={styles.practice_btn}>
        <Text style={styles.practice_btn_text}>THỰC HÀNH</Text>
      </Pressable>
      <CustomModal
        modalType="delete-subject"
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        idSubject={id}
      ></CustomModal>
      <CustomModal
        modalType="edit-subject"
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        idSubject={id}
      ></CustomModal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  //view
  item: {
    backgroundColor: "#4d4d4d",
    width: width * 0.95,
    marginTop: 5,
    // marginLeft: 0,
    // marginRight: auto,
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
    right: -140,
    top: 50,
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
    fontSize: 20,
    fontWeight: "700",
  },
  menu_text: {
    color: "#FFF",
  },
});
