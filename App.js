import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Flashcard } from "./src/screens/Flashcard";
import { LearnVoc } from "./src/screens/LearnVoc";
import { Minigame } from "./src/screens/Minigame";
import { FlashcardDetail } from "./src/screens/FlashcardDetail";
import { Vocabulary } from "./src/screens/Vocabulary";

import { MenuProvider } from "react-native-popup-menu";

const Stack = createNativeStackNavigator();

const COLOR = {
  icon: "#2d2c45",
  one: "#FF9F9F",
  two: "#B5E67B",
  three: "#B9E0FF",
};

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Flashcard" component={Flashcard} />
          <Stack.Screen name="LearnVoc" component={LearnVoc} />
          <Stack.Screen name="Minigame" component={Minigame} />
          <Stack.Screen name="FlashcardDetail" component={FlashcardDetail} />
          <Stack.Screen name="Vocabulary" component={Vocabulary} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const HomeScreen = ({ navigation }) => {
  const getCurrentDate = (type = false) => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var day_name = "Today";
    switch (new Date().getDay()) {
      case 0:
        day_name = "Sun";
        break;
      case 1:
        day_name = "Mon";
        break;
      case 2:
        day_name = "Tue";
        break;
      case 3:
        day_name = "Wed";
        break;
      case 4:
        day_name = "Thur";
        break;
      case 5:
        day_name = "Fri";
        break;
      case 6:
        day_name = "Sat";
    }

    if (type) return date + "/" + month + "/" + year; //format: d-m-y;
    return day_name;
  };
  return (
    <SafeAreaView style={{ ...styles.container, flex: 1 }}>
      <StatusBar hidden={true} />
      <View style={styles.top}>
        <Text
          style={{
            color: "white",
            fontSize: "24",
            backgroundColor: "#2d2c45",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <Text style={{ color: "#B5E67B" }}>{getCurrentDate()},</Text>{" "}
          {getCurrentDate(true)}
        </Text>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("./assets/imgHP.png")}
        ></Image>
      </View>
      <View>
        <Text style={{ color: "#B5E67B", fontSize: "30", fontWeight: "bold" }}>
          Learn English
        </Text>
      </View>
      <View style={styles.groupBtn}>
        <Pressable
          onPress={() =>
            navigation.navigate("Flashcard", { name: "Flashcard" })
          }
          style={{ ...styles.btn, backgroundColor: COLOR.one }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={40}
            color={COLOR.icon}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>Flashcard</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("LearnVoc", { name: "LearnVoc" })}
          style={{ ...styles.btn, backgroundColor: COLOR.two }}
        >
          <MaterialCommunityIcons
            name="bullseye-arrow"
            size={40}
            color={COLOR.icon}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>LearnVoc</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Minigame", { name: "Minigame" })}
          style={{ ...styles.btn, backgroundColor: COLOR.three }}
        >
          <MaterialCommunityIcons
            name="gamepad-variant-outline"
            size={40}
            color={COLOR.icon}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>Minigame</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1d2f",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 100,
    color: "#fff",
  },
  top: {
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  groupBtn: {
    width: "90%",
    backgroundColor: "#232236",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
    height: 160,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#abacce",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn: {
    width: "31%",
    // backgroundColor: "#2d2c45",
    backgroundColor: "#a9d675",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
