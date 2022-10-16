import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export const LearnVoc = ({ navigation, route }) => {
  const [topicPress, setTopicPress] = useState(0);
  return (
    <View style={styles.body}>
      {/* <View style={TEXT}><FontAwesome5 name="bell" size={24} color="black" /></View> */}
      <View style={styles.cover}>
        <Pressable
          style={styles.topic}
          onPress={() => {
            navigation.navigate("Vocabulary");
          }}
        >
          <View style={styles.indexTopic}>
            <Text style={TEXT}> {topics[0].index}</Text>
          </View>

          <View style={styles.contentTopic}>
            <Text style={styles.nameTopic}> {topics[0].content} </Text>
            <Text style={styles.translate}> {topics[0].vietsub} </Text>
          </View>
          <View style={styles.studied}>
            <MaterialIcons name="done" size={24} color="black" />
          </View>
        </Pressable>

        <Text style={TEXT}>{topicPress}</Text>
      </View>
    </View>
  );
};

const topics = [
  {
    index: 1,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 2,
    name: "topic2",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 3,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 4,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 5,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 6,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
  {
    index: 7,
    name: "topic1",
    content: "Contract",
    vietsub: "Hợp đồng",
  },
];
const TEXT = {
  color: "#fff",
};
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#999",
    height: "100%",
    top: 0,
    margin: 0,
    padding: 0,
  },
  header: {
    alignItems: "flex-end",
  },
  cover: {
    height: "100%",
    backgroundColor: "#666",
    margin: 0,
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    height: 100,
    width: "100%",
    marginBottom: 2,
    marginTop: 2,
    borderRadius: 16,
    justifyContent: "flex-start",
  },
  indexTopic: {
    backgroundColor: "#209647",
    width: 50,
    alignItems: "center",
    left: -10,
    borderRadius: 5,
  },
  contentTopic: {
    margin: 30,
    height: "70%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  studied: {
    position: "absolute",
    right: 10,
    padding: 10,
    ...TEXT,
    backgroundColor: "#999",
    borderRadius: 50,
  },
  nameTopic: {
    ...TEXT,
    fontSize: 16,
    fontWeight: "700",
  },
  translate: {
    color: "#aaa",
  },
});
