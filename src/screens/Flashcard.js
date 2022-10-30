import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase_config";
import { collection, getDocs } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

var width = Dimensions.get("window").width;
const DATA = [
  {
    id: "001",
    name: "color",
  },
  {
    id: "002",
    name: "animal",
  },
  {
    id: "003",
    name: "animal",
  },
  {
    id: "004",
    name: "animal",
  },
  {
    id: "005",
    name: "animal",
  },
];

const Item = ({ navigation, name }) => (
  <Pressable
    style={styles.item}
    onPress={() =>
      navigation.navigate("FlashcardDetail", { name: "FlashcardDetail" })
    }
  >
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
          <Entypo
            name="edit"
            size={16}
            color="white"
            style={styles.menu_edit_icon}
          />
          <Text style={styles.menu_text}>Chỉnh sửa</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Xóa`)} style={styles.menu_option}>
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

    <Text style={styles.name}>{name}</Text>
    <Text style={styles.small}>Đã ghi nhớ 0/1 thẻ</Text>
    <Pressable style={styles.add_btn}>
      <View style={styles.add_btn_content}>
        <Entypo name="plus" size={16} color="white" style={styles.add_icon} />
        <Text style={styles.add_btn_text}>THÊM THẺ</Text>
      </View>
    </Pressable>
    <Pressable style={styles.practice_btn}>
      <Text style={styles.practice_btn_text}>THỰC HÀNH</Text>
    </Pressable>
  </Pressable>
);

export const Flashcard = ({ navigation, route }) => {
  const [state, setState] = useState([]);
  const collectionRef = collection(db, "test");
  useEffect(() => {
    // console.log("useeffect");
    const getData = async () => {
      const data = await getDocs(collectionRef);
      setState(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
    };
    getData();
  });

  // const voiceHandle = () => {
  //   console.log("hello");
  //   const thingToSay = "Hello";
  //   Speech.speak(thingToSay);
  // };
  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* <View>
        <Text>Chọn bộ từ vựng</Text>
      </View>
      <View>
        <Text>{state.name}</Text>
        <Text>{state.id}</Text>
        <Button title="Phát" onPress={() => voiceHandle()} />
      </View> */}
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item
              navigation={navigation}
              style={styles.item}
              name={item.name}
            ></Item>
          )}
        />
        <Pressable style={styles.add_subject_btn}>
          <View style={styles.add_btn_content}>
            <Entypo
              name="plus"
              size={16}
              color="white"
              style={styles.add_icon}
            />
            <Text style={styles.add_btn_text}>THÊM BỘ</Text>
          </View>
        </Pressable>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  //view
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#262626",
    color: "#FFF",
  },
  item: {
    flex: 1,
    backgroundColor: "#4d4d4d",
    width: width,
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
  add_subject_btn: {
    backgroundColor: "#5F9DF7",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 130,
    position: "absolute",
    bottom: 15,
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
