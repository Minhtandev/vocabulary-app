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
    <View style={styles.action}>
      <Text>:</Text>
    </View>
  </View>
);

export const FlashcardDetail = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.toolbar}>
      <Text>Toolbar</Text>
    </View>
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
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
    backgroundColor: "#4d4d4d",
    width: 150,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 10,
  },
  action: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  //button
  //text
  name: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  defi: {
    color: "#FFFFFF",
  },
});
