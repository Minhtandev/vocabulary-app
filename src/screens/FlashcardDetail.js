import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";

var width = Dimensions.get("window").width;

const DATA = [
  {
    id: "001",
    name: "blue",
    defi: "xanh",
  },
  {
    id: "002",
    name: "red",
    defi: "đỏ",
  },
  {
    id: "003",
    name: "blue",
    defi: "xanh",
  },
  {
    id: "004",
    name: "red",
    defi: "đỏ",
  },
];

const Item = ({ name, defi }) => (
  <View style={styles.item}>
    <View style={styles.content}>
      <Text style={styles.name}>{name ? name : "lỗi"}</Text>
      <Text style={styles.defi}>{defi ? defi : "lỗi"}</Text>
    </View>
    <View style={styles.btns}>
      <Pressable style={styles.add_btn}>
        <Text style={styles.btn_text}>THÊM THẺ</Text>
      </Pressable>
      <Pressable style={styles.add_btn}>
        <Text style={styles.btn_text}>THÊM THẺ</Text>
      </Pressable>
    </View>
  </View>
);

export const FlashcardDetail = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.toolbar}>
      <Text>Toolbar</Text>
    </View>
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item
          navigation={navigation}
          style={styles.item}
          name={item.name}
          defi={item.defi}
        ></Item>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  //view
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#262626",
    color: "#FFF",
  },
  toolbar: {},
  item_list: {
    flex: 1,
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
  action: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  btns: {
    flexDirection: "row",
  },
  //button
  add_btn: {
    backgroundColor: "#5F9DF7",
    borderRadius: 50,
    paddingTop: 5,
    paddingLeft: 30,
    paddingBottom: 5,
    paddingRight: 5,
    width: 130,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
  },

  //text
  btn_text: {
    color: "#FFF",
    fontWeight: "500",
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  defi: {
    fontSize: 12,
    color: "#D8D9CF",
  },
});
