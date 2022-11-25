import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
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
import CreateMinigame from "./src/screens/CreateMinigame";
import Login from "./src/screens/Login";
// logout use firebase
import { getAuth, signOut } from "firebase/auth";
import Register from "./src/screens/Register";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase_config";
// save data of user
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const COLOR = {
  icon: "#2d2c45",
  one: "#FF9F9F",
  two: "#B5E67B",
  three: "#B9E0FF",
  bg: "#fff",
};

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Flashcard" component={Flashcard} />
          <Stack.Screen name="LearnVoc" component={LearnVoc} />
          <Stack.Screen name="CreateMinigame" component={CreateMinigame} />
          <Stack.Screen name="Minigame" component={Minigame} />
          <Stack.Screen name="FlashcardDetail" component={FlashcardDetail} />
          <Stack.Screen name="Vocabulary" component={Vocabulary} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const HomeScreen = ({ navigation }) => {
  const [currUser, setCurrUser] = useState({});

  // const getCurrentDate = (type = false) => {
  //   var date = new Date().getDate();
  //   var month = new Date().getMonth() + 1;
  //   var year = new Date().getFullYear();
  //   var day_name = "Today";
  //   switch (new Date().getDay()) {
  //     case 0:
  //       day_name = "Sun";
  //       break;
  //     case 1:
  //       day_name = "Mon";
  //       break;
  //     case 2:
  //       day_name = "Tue";
  //       break;
  //     case 3:
  //       day_name = "Wed";
  //       break;
  //     case 4:
  //       day_name = "Thur";
  //       break;
  //     case 5:
  //       day_name = "Fri";
  //       break;
  //     case 6:
  //       day_name = "Sat";
  //   }

  //   if (type) return date + "/" + month + "/" + year; //format: d-m-y;
  //   return day_name;
  // };

  const handleLogOut = () => {
    // Lấy người dùng hiện tại
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
        setCurrUser({});
        console.log("logged out");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //
  const collectionRef_user = collection(db, "user");

  // get user from database
  useEffect(() => {
    // Lấy người dùng hiện tại đang đăng nhập ra
    const auth = getAuth();
    const user = auth.currentUser;
    // lấy được id của người dùng -> truyền nó vào db để lấy ra những nội dung cần thiết ....
    if (user) {
      onSnapshot(collectionRef_user, (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .find((item) => item.userId === user?.uid);
        setCurrUser(data);
      });
    }
  }, []);
  return (
    <SafeAreaView style={{ ...styles.container, flex: 1 }}>
      <StatusBar hidden={true} />
      <View style={styles.top}>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={{ color: "red" }}>Log out</Text>
        </TouchableOpacity>
        {/* <Text>Hi, {currUser?.username}</Text> */}
        {/* <Text>UserId: {user?.uid}</Text> */}
        <Text
          style={{
            color: "white",
            // fontSize: "24",
            backgroundColor: "#2d2c45",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          Hi,
          <Text style={{ color: "#B5E67B" }}> {currUser?.username}</Text>
        </Text>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("./assets/imgHP.png")}
        ></Image>
      </View>
      <View>
        <Text style={{ color: "#176ed2", fontSize: 24, fontWeight: "bold" }}>
          Learn English
        </Text>
      </View>
      <View style={styles.groupBtn}>
        <Pressable
          onPress={() =>
            navigation.navigate("Flashcard", { name: "Flashcard" })
          }
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={40}
            color={COLOR.one}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>Flashcard</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("LearnVoc", { name: "LearnVoc" })}
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="bullseye-arrow"
            size={40}
            color={COLOR.two}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>LearnVoc</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("CreateMinigame", { name: "CreateMinigame" })
          }
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="gamepad-variant-outline"
            size={40}
            color={COLOR.three}
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
    // backgroundColor: "#1e1d2f",
    backgroundColor: "#f2f2f2",

    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 100,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // alignItems: "flex-end",
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
    // backgroundColor: "#232236",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 100,
    height: 160,
    // padding: 10,
    paddingVertical: 10,
    // borderRadius: 10,
    // shadowColor: "#abacce",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  btn: {
    width: "31%",
    // backgroundColor: "#2d2c45",
    backgroundColor: "#a9d675",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: "#2d2c45",
    fontWeight: "700",
    fontSize: 16,
  },
});
