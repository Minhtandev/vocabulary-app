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
  Modal,
  Button,
} from "react-native";
// import CheckBox from "expo-checkbox";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import MyText from "./src/components/MyText";
// save data of user
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const COLOR = {
  icon: "#2d2c45",
  one: "#FF9F9F",
  two: "#B5E67B",
  three: "#B9E0FF",
  bg: "#fff",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
};

export default function App() {
  return (
    <>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Màn hình chính",
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              }}
            />
            <Stack.Screen
              name="Flashcard"
              component={Flashcard}
              options={{
                title: "Flashcard",
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              }}
            />
            <Stack.Screen
              name="LearnVoc"
              component={LearnVoc}
              options={{
                title: "Các bộ từ vựng",
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              }}
            />
            <Stack.Screen
              name="CreateMinigame"
              component={CreateMinigame}
              options={{
                title: "Tạo minigame",
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              }}
            />
            <Stack.Screen
              name="Minigame"
              component={Minigame}
              options={{
                title: "Minigame",
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              }}
            />
            <Stack.Screen
              name="FlashcardDetail"
              component={FlashcardDetail}
              options={({ route }) => ({
                title: route.params.subjectName,
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              })}
            />
            <Stack.Screen
              name="Vocabulary"
              component={Vocabulary}
              options={({ route }) => ({
                title: route.params.subjectName,
                headerStyle: {
                  backgroundColor: "#f0edff",
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
      <Toast />
    </>
  );
}

const HomeScreen = ({ navigation }) => {
  const [currUser, setCurrUser] = useState({});
  //nhạc nền
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/audio.mp3"),
      { isLooping: true }
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
    setPlaying(true);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound();
  }, []);

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
          <MyText style={{ color: "red" }}>Log out</MyText>
          {/* <Text style={{ color: "red" }}>Log out</Text> */}
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            if (playing == true) {
              sound.pauseAsync();
              setPlaying(!playing);
            } else {
              sound.playAsync();
              setPlaying(!playing);
            }
          }}
        >
          {playing ? (
            <MaterialCommunityIcons name="music" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons name="music-off" size={24} color="black" />
          )}
        </Pressable>
        {/* <Text>Hi, {currUser?.username}</Text> */}
        {/* <Text>UserId: {user?.uid}</Text> */}
        <MyText
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
          <MyText style={{ color: "#B5E67B" }}> {currUser?.username}</MyText>
        </MyText>
      </View>
      <View>
        <Image
          style={styles.image}
          source={require("./assets/imgHP.png")}
        ></Image>
      </View>
      <View>
        {/* <Text style={{ color: "#176ed2", fontSize: 24, fontWeight: "bold" }}>
          Learn English
        </Text> */}
        <MyText style={{ color: COLOR.third, fontSize: 24 }} weight={900}>
          Learn English
        </MyText>
      </View>
      <View style={styles.groupBtn}>
        <Pressable
          onPress={() => {
            navigation.navigate("Flashcard", {
              name: "Flashcard",
              userId: currUser.id,
            });
            if (playing == true) {
              sound.pauseAsync();
              setPlaying(!playing);
            }
          }}
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={40}
            color={COLOR.one}
            style={{ marginBottom: 10 }}
          />
          <MyText style={styles.text}>Flashcard</MyText>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("LearnVoc", { name: "LearnVoc" });
            if (playing == true) {
              sound.pauseAsync();
              setPlaying(!playing);
            }
          }}
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="bullseye-arrow"
            size={40}
            color={COLOR.two}
            style={{ marginBottom: 10 }}
          />
          <MyText style={styles.text}>LearnVoc</MyText>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("CreateMinigame", {
              name: "CreateMinigame",
              sound: sound,
              playing: playing,
            });
            if (playing == true) {
              sound.pauseAsync();
              setPlaying(!playing);
            }
          }}
          style={{ ...styles.btn, backgroundColor: COLOR.bg }}
        >
          <MaterialCommunityIcons
            name="gamepad-variant-outline"
            size={40}
            color={COLOR.three}
            style={{ marginBottom: 10 }}
          />
          <MyText style={styles.text}>Minigame</MyText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0edff",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  groupBtn: {
    width: "90%",
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
    // fontWeight: "700",
    fontSize: 16,
  },
});
