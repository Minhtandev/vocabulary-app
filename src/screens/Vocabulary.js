import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export const Vocabulary = ({ navigation, route }) => {
  return (
    <View style={styles.cover}>
      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Entypo name="add-to-list" size={24} color="black" />
        <View>
          <Text style={styles.title}>Chicken</Text>
          <Text style={styles.symbol}>/ˈtʃɪk.ɪn/</Text>
        </View>
        <Pressable style={styles.infor}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.modal}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: "100%",
    backgroundColor: "#d7f8fa",
    alignItems: "center",
    paddingTop: 40,
  },
  item: {
    width: "80%",
    height: 80,
    padding: 30,
    borderRadius: 50,
    backgroundColor: "#65a9c2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 100,
    margin: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  symbol: {
    color: "#3a464a",
  },
  addList: {},
  infor: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f5f7",
    borderRadius: 50,
  },
  modal: {},
});
