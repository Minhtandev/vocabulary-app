//Của react và react native
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Button,
  ImageBackground,
} from "react-native";
import MyText from "../MyText";
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
import image from "../../../assets/flashcard_item_bg.jpg";

//Lấy width của window
var width = Dimensions.get("window").width;
export const Item = ({ navigation, name, desc, id, userId, subjectArr }) => {
  //Các state
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // console.log("item >>>", userId);
  // console.log("subjectArr at item >>>", subjectArr);

  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate("FlashcardDetail", {
          name: name,
          subjectId: id,
          subjectName: name,
          subjectArr: subjectArr,
        })
      }
    >
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      {/* <MyText>{id}</MyText> */}
      <MyText weight={700} style={styles.name}>
        {name}
      </MyText>
      <MyText style={styles.small}>{desc}</MyText>
      {id == "favourite" ? (
        <>
          <Pressable
            style={styles.practice_btn}
            onPress={() =>
              navigation.navigate("FlashcardDetail", {
                name: name,
                subjectId: id,
                subjectName: name,
                subjectArr: subjectArr,
              })
            }
          >
            <MyText weight={500} style={styles.practice_btn_text}>
              XEM
            </MyText>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={styles.add_btn}
            onPress={() => setAddCardModalVisible(true)}
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
          <Menu>
            <MenuTrigger
              // style={styles.dots}
              customStyles={{
                TriggerTouchableComponent: Pressable,
                triggerTouchable: { title: "Select (Custom Touchables)" },
                triggerOuterWrapper: styles.practice_btn,
                triggerText: styles.practice_btn_text,
              }}
              text="THAO TÁC"
            />
            <MenuOptions style={styles.menu_container}>
              <MenuOption
                onSelect={() => setAddCardModalVisible(true)}
                style={styles.menu_option}
              >
                <Entypo
                  name="plus"
                  size={16}
                  color="#8469ff"
                  style={styles.menu_add_icon}
                />
                <MyText style={styles.menu_text}>Thêm</MyText>
              </MenuOption>
              <MenuOption
                onSelect={() => setEditModalVisible(true)}
                style={styles.menu_option}
              >
                <Entypo
                  name="edit"
                  size={16}
                  color="#8469ff"
                  style={styles.menu_edit_icon}
                />
                <MyText style={styles.menu_text}>Chỉnh sửa</MyText>
              </MenuOption>
              <MenuOption
                onSelect={() => setDeleteModalVisible(true)}
                style={styles.menu_option}
              >
                <MaterialIcons
                  name="delete"
                  size={16}
                  color="#8469ff"
                  style={styles.menu_delete_icon}
                />
                <MyText style={styles.menu_text}>Xóa</MyText>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </>
      )}

      <CustomModal
        modalType="delete-subject"
        modalVisible={deleteModalVisible}
        setModalVisible={setDeleteModalVisible}
        idSubject={id}
        nameSubject={name}
        desc={desc}
        userId={userId}
      ></CustomModal>
      <CustomModal
        modalType="edit-subject"
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        idSubject={id}
        nameSubject={name}
        desc={desc}
        userId={userId}
      ></CustomModal>
      <CustomModal
        modalType="add-subject"
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        userId={userId}
      ></CustomModal>
      <CustomModal
        modalType="add-card"
        modalVisible={addCardModalVisible}
        setModalVisible={setAddCardModalVisible}
        subjectIdToAdd={id}
        userId={userId}
      ></CustomModal>
      {/* </ImageBackground> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  //view
  item: {
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#f0edff",
    borderWidth: 2,
    borderColor: "#8469ff",
    borderStyle: "solid",
    width: width * 0.95,
    marginTop: 5,
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
    alignItems: "center",
    justifyContent: "center",
  },
  menu_container: {
    width: 150,
    position: "absolute",
    left: 140,
    top: -90,
    borderWidth: 2,
    borderColor: "#8469ff",
    borderStyle: "solid",
    borderRadius: 10,
    overflow: "hidden",
  },

  //button
  add_btn: {
    backgroundColor: "#8469ff",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 110,
    marginTop: 10,
    // marginBottom: 5,
  },
  practice_btn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#8469ff",
    borderStyle: "solid",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 110,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  menu_option: {
    backgroundColor: "#f0edff",
    flexDirection: "row",
    height: 40,
    lineHeight: 40,
    alignItems: "center",
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
  menu_add_icon: {
    marginLeft: 3,
    marginRight: 5,
    // marginTop: 2,
  },
  menu_edit_icon: {
    marginLeft: 3,
    marginRight: 5,
    // marginTop: 3,
  },
  menu_delete_icon: {
    marginLeft: 3,
    marginRight: 5,
    // marginTop: 3,
  },
  //text
  small: {
    fontSize: 14,
    color: "#303030",
  },
  add_btn_text: {
    color: "#FFFFFF",
    // fontWeight: "500",
  },
  practice_btn_text: {
    color: "#8469ff",
    textAlign: "center",
    // fontWeight: "500",
  },
  name: {
    color: "#303030",
    fontSize: 20,
    // fontWeight: "700",
  },
  menu_text: {
    color: "#8469ff",
    fontSize: 18,
  },
});
