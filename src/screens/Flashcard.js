
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
    name: "color",
  },
  {
    id: "002",
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
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.small}>Đã ghi nhớ 0/1 thẻ</Text>
    <Pressable style={styles.add_btn}>
      <Text style={styles.btn_text}>THÊM THẺ</Text>
    </Pressable>
  </Pressable>
);

export const Flashcard = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Chọn bộ từ vựng</Text>
      </View>
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
    </View>
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
  },

  //text
  small: {
    color: "#FFF",
    fontSize: 12,
    color: "#D8D9CF",
  },
  btn_text: {
    color: "#FFF",
    fontWeight: "500",
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
});

