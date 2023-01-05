import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
// import CheckBox from "expo-checkbox";

// logout use firebase
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../config/firebase_config";
import MyText from "../components/MyText";
import { useUser } from "../context/userContext";
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

export const HomeScreen = ({ navigation }) => {
  //
  const userContext = useUser();

  //nhạc nền
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/game_song.mp3"),
      { isLooping: true, volume: 0.1 }
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
    console.log(sound);
    playSound();
  }, []);

  const collectionRef_user = collection(db, "user");
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    onSnapshot(collectionRef_user, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.userId === user?.uid);
      // console.log(23, data);
      userContext.updateProfile({ ...data });
    });
  }, []);

  const handleLogOut = () => {
    // Lấy người dùng hiện tại
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // navigation.replace("Login");
        userContext.logOut();
        console.log("logged out");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // // ---- bộ từ vựng mới học
  const collectionRef_laSubject = collection(db, "latest_subject");
  const [subject, setSubject] = useState(null);
  // console.log("subject", subject);
  // console.log("userId", userContext.user.userId);
  useEffect(() => {
    onSnapshot(collectionRef_laSubject, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.userId === userContext.user.userId);
      setSubject(data);
    });
  }, [userContext.user.userId]);
  //
  return (
    <SafeAreaView style={{ ...styles.container, flex: 1 }}>
      <StatusBar hidden={true} />
      {/* top */}
      <View style={styles.top}>
        <TouchableOpacity onPress={handleLogOut}>
          <MyText style={{ color: "red" }}>Log out</MyText>
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: COLOR.primary, borderRadius: 100 }}>
            <Image
              style={{ width: 40, height: 40, paddingRight: 5 }}
              source={require("../../assets/icons/avt.png")}
            />
          </View>
          <MyText style={{ color: "#2d2c45", marginLeft: 5 }} weight={700}>
            {userContext.user?.username}
          </MyText>
        </View>
      </View>
      {/* center */}
      {/* <View>
        <Image
          style={styles.image}
          source={require("../../assets/imgHP.png")}
        ></Image>
      </View> */}
      <View style={{ height: 200 }}>
        {/* <MyText
          style={{ color: COLOR.third, fontSize: 40, marginTop: 70 }}
          weight={900}
        >
          Learn English
        </MyText> */}
        <Image
          style={{ width: 300, height: 240 }}
          source={require("../../assets/logo.png")}
        />
      </View>
      {/*  */}
      <View style={{ flex: 1, width: "90%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText
            style={{ fontSize: 24, marginLeft: 10, marginBottom: 10 }}
            weight={700}
          >
            Bộ từ vừa học
          </MyText>
        </View>
        <View>
          <Pressable
            onPress={() => {
              if (subject) {
                navigation.navigate("Vocabulary", {
                  name: "Vocabulary",
                  subjectId: subject.subjectId,
                  subjectName: subject.subjectName,
                });
              } else {
                navigation.navigate("LearnVoc", { name: "LearnVoc" });
              }
              if (playing == true) {
                sound.pauseAsync();
                setPlaying(!playing);
              }
            }}
            style={{
              ...styles.btnHorizontal,
              backgroundColor: "#faf9ff",
            }}
          >
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/icons/learning.png")}
            />
            <MyText
              style={{
                ...styles.text,
                color: COLOR.primary,
                paddingLeft: 5,
                fontSize: 18,
                marginLeft: 10,
              }}
              weight={800}
            >
              {subject ? subject.subjectName : "Học ngay"}
            </MyText>
          </Pressable>
        </View>
      </View>
      {/* GROUP FUNCTION */}
      <View style={{ flex: 2 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MyText style={{ fontSize: 24, marginLeft: 10 }} weight={700}>
            Tính năng
          </MyText>
          {/* <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/icons/feature.png")}
          /> */}
        </View>
        <View style={styles.groupBtn}>
          <Pressable
            onPress={() => {
              navigation.navigate("Flashcard", {
                name: "Flashcard",
                userId: userContext.user?.userId,
              });
              // if (playing == true) {
              //   sound.pauseAsync();
              //   setPlaying(!playing);
              // }
            }}
            style={{ ...styles.btn, backgroundColor: COLOR.bg }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/icons/flash-cards.png")}
            />
            <MyText style={styles.text}>Flashcard</MyText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("LearnVoc", { name: "LearnVoc" });
              // if (playing == true) {
              //   sound.pauseAsync();
              //   setPlaying(!playing);
              // }
            }}
            style={{ ...styles.btn, backgroundColor: COLOR.bg }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/icons/study.png")}
            />
            <MyText style={styles.text}>Vocabulary</MyText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("CreateMinigame", {
                name: "CreateMinigame",
                // sound: sound,
                // playing: playing,
              });
              // if (playing == true) {
              //   sound.pauseAsync();
              //   setPlaying(!playing);
              // }
            }}
            style={{ ...styles.btn, backgroundColor: COLOR.bg }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/icons/game.png")}
            />
            <MyText style={styles.text}>Minigame</MyText>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Translate", {
                name: "Translate",
                // sound: sound,
                // playing: playing,
              });
              // if (playing == true) {
              //   sound.pauseAsync();
              //   setPlaying(!playing);
              // }
            }}
            style={{ ...styles.btn, backgroundColor: COLOR.bg }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/icons/dictionary.png")}
            />
            <MyText style={styles.text}>Translation</MyText>
          </Pressable>
        </View>
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
    flexWrap: "wrap",
    // alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 100,
    height: 160,
    // padding: 10,
    paddingVertical: 10,
    paddingLeft: 10,
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
    width: "50%",
    // backgroundColor: "#2d2c45",
    backgroundColor: "#a9d675",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 25,
    // elevation: 5,
    borderWidth: 2,
    borderColor: "#abacce",
    marginRight: 10,
    flexBasis: "40%",
    flexGrow: 1,
    marginBottom: 10,
  },
  text: {
    color: "#2d2c45",
    fontSize: 16,
    marginTop: 4,
  },
  btnHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 18,
    // elevation: 5,
    borderWidth: 2,
    borderColor: "#b6a6ff",
    flexBasis: "40%",
    flexGrow: 1,
  },
  btnTranslate: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#a9d675",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    position: "absolute",
    top: -50,
  },
});
