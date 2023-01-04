import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressablem,
  Image,
  Pressable,
  FlatList,
  Alert,
  GestureFlipView,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
// import { Modal } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase_config";
import imageBackground from "../../assets/vocabularyBackground.jpg";
import Carousel from "react-native-snap-carousel";
import MyText from "../components/MyText";
import { CustomModal } from "../components/flashcard/CustomModal";
import * as Speech from "expo-speech";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
import { useUser } from "../context/userContext";
import { LinearGradient } from "react-native-gradients";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const DATA = [
  {
    id: "001",
    name: "color",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "002",
    name: "animal",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "003",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "004",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "005",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "006",
    name: "color",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "007",
    name: "animal",
    symbol: "/ˈtʃɪk.ɪn/",
  },
  {
    id: "008",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "009",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
  {
    id: "010",
    symbol: "/ˈtʃɪk.ɪn/",
    name: "animal",
  },
];

// console.log(IMAGES);
const IMAGES = {
  "Crow.jpg": require("../../assets/images/Crow.jpg"),
  "Dove.jpg": require("../../assets/images/Dove.jpg"),
  "Eagle.jpg": require("../../assets/images/Eagle.jpg"),
  "Falcon.jpg": require("../../assets/images/Falcon.jpg"),
  "Flamingo.jpg": require("../../assets/images/Flamingo.jpg"),
  "Goose.jpg": require("../../assets/images/Goose.jpg"),
  "Owl.jpg": require("../../assets/images/Owl.jpg"),
  "Parrot.jpg": require("../../assets/images/Parrot.jpg"),
  "Sparrow.jpg": require("../../assets/images/Sparrow.jpg"),
  "Swan.jpg": require("../../assets/images/Swan.jpg"),
  "Turkey.jpg": require("../../assets/images/Turkey.jpg"),
  "Bat.jpg": require("../../assets/images/Bat.jpg"),
  "Bear.jpg": require("../../assets/images/Bear.jpg"),
  "Buffalo.jpg": require("../../assets/images/Buffalo.jpg"),
  "Camel.jpg": require("../../assets/images/Camel.jpg"),
  "Elephant.jpg": require("../../assets/images/Elephant.jpg"),
  "Fox.jpg": require("../../assets/images/Fox.jpg"),
  "Goat.jpg": require("../../assets/images/Goat.jpg"),
  "Shark.jpg": require("../../assets/images/Shark.jpg"),
  "Whale.jpg": require("../../assets/images/Whale.jpg"),
  "Doctor.jpg": require("../../assets/images/Doctor.jpg"),
  "Dentist.jpg": require("../../assets/images/Dentist.jpg"),
  "Cashier.jpg": require("../../assets/images/Cashier.jpg"),
  "Builder.jpg": require("../../assets/images/Builder.jpg"),
  "Reporter.jpg": require("../../assets/images/Reporter.jpg"),
  "Cook.jpg": require("../../assets/images/Cook.jpg"),
  "Magician.jpg": require("../../assets/images/Magician.jpg"),
  "Singer.jpg": require("../../assets/images/Singer.jpg"),
  "Tailor.jpg": require("../../assets/images/Tailor.jpg"),
  "Teacher.jpg": require("../../assets/images/Teacher.jpg"),
  "Baker.jpg": require("../../assets/images/Baker.jpg"),
  "Artist.jpg": require("../../assets/images/Artist.jpg"),
  "Waiter.jpg": require("../../assets/images/Waiter.jpg"),
  "Carpenter.jpg": require("../../assets/images/Carpenter.jpg"),
  "Actor.jpg": require("../../assets/images/Actor.jpg"),
  "Nurse.jpg": require("../../assets/images/Nurse.jpg"),
  "Secretary.jpg": require("../../assets/images/Secretary.jpg"),
  "Gardener.jpg": require("../../assets/images/Gardener.jpg"),
  "Businessman.jpg": require("../../assets/images/Businessman.jpg"),
  "Seat.jpg": require("../../assets/images/Seat.jpg"),
  "BusDriver.jpg": require("../../assets/images/BusDriver.jpg"),
  "Car.jpg": require("../../assets/images/Car.jpg"),
  "Bus.jpg": require("../../assets/images/Bus.jpg"),
  "Bicycle.jpg": require("../../assets/images/Bicycle.jpg"),
  "Motorbike.jpg": require("../../assets/images/Motorbike.jpg"),
  "Train.jpg": require("../../assets/images/Train.jpg"),
  "Sailboat.jpg": require("../../assets/images/Sailboat.jpg"),
  "Airplane.jpg": require("../../assets/images/Airplane.jpg"),
  "Coach.jpg": require("../../assets/images/Coach.jpg"),
  "Ambulance.jpg": require("../../assets/images/Ambulance.jpg"),
  "Ship.jpg": require("../../assets/images/Ship.jpg"),
  "Taxi.jpg": require("../../assets/images/Taxi.jpg"),
  "TrafficJam.jpg": require("../../assets/images/TrafficJam.jpg"),
  "Railway.jpg": require("../../assets/images/Railway.jpg"),
  "SlowDown.jpg": require("../../assets/images/SlowDown.jpg"),
  "PetrolStation.jpg": require("../../assets/images/PetrolStation.jpg"),
  "Sidewalk.jpg": require("../../assets/images/Sidewalk.jpg"),
  "TrafficLight.jpg": require("../../assets/images/TrafficLight.jpg"),
  "Transportation.jpg": require("../../assets/images/Transportation.jpg"),
  "Passenger.jpg": require("../../assets/images/Passenger.jpg"),
  "Ask.jpg": require("../../assets/images/Ask.jpg"),
  "Begin.jpg": require("../../assets/images/Begin.jpg"),
  "Call.jpg": require("../../assets/images/Call.jpg"),
  "Come.jpg": require("../../assets/images/Come.jpg"),
  "Do.jpg": require("../../assets/images/Do.jpg"),
  "Find.jpg": require("../../assets/images/Find.jpg"),
  "Get.jpg": require("../../assets/images/Get.jpg"),
  "Give.jpg": require("../../assets/images/Give.jpg"),
  "Go.jpg": require("../../assets/images/Go.jpg"),
  "Hear.jpg": require("../../assets/images/Hear.jpg"),
  "Help.jpg": require("../../assets/images/Help.jpg"),
  "Keep.jpg": require("../../assets/images/Keep.jpg"),
  "Know.jpg": require("../../assets/images/Know.jpg"),
  "Leave.jpg": require("../../assets/images/Leave.jpg"),
  "Let.jpg": require("../../assets/images/Let.jpg"),
  "Like.jpg": require("../../assets/images/Like.jpg"),
  "Live.jpg": require("../../assets/images/Live.jpg"),
  "Look.jpg": require("../../assets/images/Look.jpg"),
  "Make.jpg": require("../../assets/images/Make.jpg"),
  "Move.jpg": require("../../assets/images/Move.jpg"),
  "Need.jpg": require("../../assets/images/Need.jpg"),
  "Play.jpg": require("../../assets/images/Play.jpg"),
  "Put.jpg": require("../../assets/images/Put.jpg"),
  "Run.jpg": require("../../assets/images/Run.jpg"),
  "Say.jpg": require("../../assets/images/Say.jpg"),
  "See.jpg": require("../../assets/images/See.jpg"),
  "Show.jpg": require("../../assets/images/Show.jpg"),
  "Start.jpg": require("../../assets/images/Start.jpg"),
  "Take.jpg": require("../../assets/images/Take.jpg"),
  "Talk.jpg": require("../../assets/images/Talk.jpg"),
  "Tell.jpg": require("../../assets/images/Tell.jpg"),
  "Think.jpg": require("../../assets/images/Think.jpg"),
  "Try.jpg": require("../../assets/images/Try.jpg"),
  "Turn.jpg": require("../../assets/images/Turn.jpg"),
  "Use.jpg": require("../../assets/images/Use.jpg"),
  "Want.jpg": require("../../assets/images/Want.jpg"),
  "Work.jpg": require("../../assets/images/Work.jpg"),
  "Gorgeous.jpg": require("../../assets/images/Gorgeous.jpg"),
  "Magnificent.jpg": require("../../assets/images/Magnificent.jpg"),
  "Breathtaking.jpg": require("../../assets/images/Breathtaking.jpg"),
  "Intoxicate.jpg": require("../../assets/images/Intoxicate.jpg"),
  "Idyllic.jpg": require("../../assets/images/Idyllic.jpg"),
  "Stunning.jpg": require("../../assets/images/Stunning.jpg"),
  "Wonderful.jpg": require("../../assets/images/Wonderful.jpg"),
  "Ancient.jpg": require("../../assets/images/Ancient.jpg"),
  "Attractive.jpg": require("../../assets/images/Attractive.jpg"),
  "Bustling.jpg": require("../../assets/images/Bustling.jpg"),
  "Cliff.jpg": require("../../assets/images/Cliff.jpg"),
  "Coastline.jpg": require("../../assets/images/Coastline.jpg"),
  "Bay.jpg": require("../../assets/images/Bay.jpg"),
  "Cauliflower.jpg": require("../../assets/images/Cauliflower.jpg"),
  "Cabbage.jpg": require("../../assets/images/Cabbage.jpg"),
  "Artichoke.jpg": require("../../assets/images/Artichoke.jpg"),
  "Peas.jpg": require("../../assets/images/Peas.jpg"),
  "Bean.jpg": require("../../assets/images/Bean.jpg"),
  "Corn.jpg": require("../../assets/images/Corn.jpg"),
  "Garlic.jpg": require("../../assets/images/Garlic.jpg"),
  "White.jpg": require("../../assets/images/White.jpg"),
  "Blue.jpg": require("../../assets/images/Blue.jpg"),
  "Green.jpg": require("../../assets/images/Green.jpg"),
  "Yellow.jpg": require("../../assets/images/Yellow.jpg"),
  "Orange.jpg": require("../../assets/images/Orange.jpg"),
  "Solution.jpg": require("../../assets/images/Solution.jpg"),
  "Binary.jpg": require("../../assets/images/Binary.jpg"),
  "Software.jpg": require("../../assets/images/Software.jpg"),
  "Digital.jpg": require("../../assets/images/Digital.jpg"),
  "Database.jpg": require("../../assets/images/Database.jpg"),
  "Hardware.jpg": require("../../assets/images/Hardware.jpg"),
  "Design.jpg": require("../../assets/images/Design.jpg"),
  "Photography.jpg": require("../../assets/images/Photography.jpg"),
  "Sculpture.jpg": require("../../assets/images/Sculpture.jpg"),
  "Crafts.jpg": require("../../assets/images/Crafts.jpg"),
  "Palette.jpg": require("../../assets/images/Palette.jpg"),
  "Beat.jpg": require("../../assets/images/Beat.jpg"),
  "Harmony.jpg": require("../../assets/images/Harmony.jpg"),
  "Lyrics.jpg": require("../../assets/images/Lyrics.jpg"),
  "Rhythm.jpg": require("../../assets/images/Rhythm.jpg"),
  "Duet.jpg": require("../../assets/images/Duet.jpg"),
};

// const Item = ({ name, setModalVisible, route, content, setModalContent }) => (
//   <Pressable
//     style={styles.item}
//     onPress={() => {
//       setModalContent(content);
//       setModalVisible(true);
//     }}
//   >
//     <Entypo name="add-to-list" size={24} color="black" />
//     <View>
//       <Text style={styles.title}>{name}</Text>
//     </View>
//     <Pressable style={styles.infor}>
//       <AntDesign name="arrowright" size={24} color="black" />
//     </Pressable>
//   </Pressable>
// );

// const ModalItem = ({ modalVisible, setModalVisible, modalContent }) => (
//   <Modal
//     animationType="slide"
//     visible={modalVisible}
//     onRequestClose={() => {
//       setModalVisible(!modalVisible);
//     }}
//   >
//     <View style={styles.centeredView}>
//       <View style={styles.modalView}>
//         <AntDesign
//           name="close"
//           size={20}
//           color="black"
//           onPress={() => {
//             setModalVisible(!modalVisible);
//           }}
//           style={styles.close_icon}
//         />

//         <Text style={styles.nameCard}>{modalContent.name_card}</Text>
//         <Text style={styles.ipa}>{modalContent.ipa}</Text>
//         <Text style={styles.meanViet}>{modalContent.mean_viet}</Text>
//         <Text style={styles.meanEng}>{modalContent.mean_eng}</Text>
//         <Image
//           source={modalContent.image ? IMAGES[modalContent.image] : ""}
//           style={styles.imageCard}
//         />
//       </View>
//     </View>
//   </Modal>
// );

const COLOR = {
  icon: "#2d2c45",
  one: "#FF9F9F",
  two: "#B5E67B",
  three: "#B9E0FF",
  four: "#ADA2FF",

  bg: "#fff",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
  fourth: "#EEF1FF",
};

const Item = ({
  name_card,
  ipa,
  mean_eng,
  mean_viet,
  image,
  setModalVisible,
  setCardName,
  setCardDefi,
}) => {
  const voiceHandle = () => {
    // console.log("hello");
    Speech.speak(name_card, { language: "en" });
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <MyText style={styles.nameCard}>{name_card}</MyText>
        <View style={styles.ipa_sound}>
          <MyText style={styles.ipa}>{ipa}</MyText>
          <AntDesign
            name="sound"
            size={18}
            color="white"
            onPress={voiceHandle}
            style={styles.sound_icon}
          />
        </View>

        <Pressable
          style={styles.add_subject_btn}
          onPress={() => {
            setCardName(name_card);
            setCardDefi(mean_viet);
            setModalVisible(true);
          }}
        >
          <View style={styles.add_btn_content}>
            <Entypo
              name="plus"
              size={20}
              color="white"
              style={styles.add_icon}
            />
            {/* <MyText style={styles.add_btn_text}>{userId}</MyText> */}
          </View>
        </Pressable>

        <MyText style={styles.meanViet} weight={700} size={16}>
          {mean_viet}
        </MyText>
        <MyText style={styles.meanEng} weight={700} size={16}>
          {mean_eng}
        </MyText>
        <Image source={image ? IMAGES[image] : ""} style={styles.imageCard} />
      </View>
    </View>
  );
};

export const Vocabulary = ({ navigation, route }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalContent, setModalContent] = useState({});

  //âm thanh khi thêm thành công
  const [sound, setSound] = useState();
  async function playSoundTrue() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/correct-answer.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  const [subjectArrState, setSubjetArrState] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const userContext = useUser();
  //Biến id của user
  const userId = userContext.user?.userId;

  const collectionRef = collection(db, "card");
  const collectionFCRef = collection(db, "flashcard_subject");
  const collectionRef_card = collection(db, "flashcard");
  const [cardArrState, setCardArrState] = useState([]);
  const [cardName, setCardName] = useState("");
  const [cardDefi, setCardDefi] = useState("");
  // const [image, setImage] = useState("");
  //Biến id của bộ
  const subjectId = route.params.subjectId;

  const addToFC = async (id) => {
    setModalVisible(!modalVisible);
    await addDoc(collectionRef_card, {
      name: cardName,
      defi: cardDefi,
      subject: id,
      favo: false,
    });
    Toast.show({
      type: "success",
      text1: "Thêm thành công",
      text2: "Bạn vừa thêm thành công thẻ mới!!! 👋",
    });
    playSoundTrue;
  };

  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setCardArrState(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.subject == subjectId)
        );
      }),
    []
  );
  useEffect(
    () =>
      onSnapshot(collectionFCRef, (snapshot) => {
        setSubjetArrState(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.user == userId)
        );
      }),
    []
  );

  let image = "../../assets/images/Run.jpg";

  return (
    <ImageBackground source={imageBackground} resizeMode="cover">
      <View style={styles.cover}>
        {/* <Image source={require("../../assets/study.gif")} style={styles.gif} /> */}

        {/* <FlatList
          data={cardArrState}
          renderItem={({ item }) => (
            <Item
              // navigation={navigation}
              name={item.name_card}
              // symbol={item.symbol}
              content={item}
              setModalVisible={() => setModalVisible(true)}
              setModalContent={(item) => setModalContent(item)}
            ></Item>
          )}
        /> */}
        {/* <Text>{subjectArrState.length}</Text>
        <Text>{userId}</Text> */}
        <Carousel
          // ref={(c) => {
          //   this._carousel = c;
          // }}
          layout={"stack"}
          layoutCardOffset={18}
          data={cardArrState}
          renderItem={({ item }) => (
            <Item
              name_card={item.name_card}
              image={item.image}
              ipa={item.ipa}
              mean_eng={item.mean_eng}
              mean_viet={item.mean_viet}
              setModalVisible={setModalVisible}
              setCardName={setCardName}
              setCardDefi={setCardDefi}
            />
          )}
          sliderWidth={700}
          itemWidth={300}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ ...styles.add_subject_centeredView }}>
            <AntDesign
              name="close"
              size={25}
              color="black"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.btn_close_icon}
            />
            <ScrollView style={{ ...styles.add_subject_modalView }}>
              {subjectArrState.length > 0 ? (
                subjectArrState.map((item, i) => (
                  <View key={i} style={styles.subject_view}>
                    <Text style={styles.subject_name}>{item.name}</Text>
                    <Pressable
                      onPress={() => addToFC(item.id)}
                      style={styles.btn_add}
                    >
                      <AntDesign name="addfolder" size={24} color="black" />
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text>Chưa có bộ nào</Text>
              )}
              {/* <Text>{cardName + " " + cardDefi}</Text> */}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "relative",
    top: 20,
  },
  buttonOpen: {
    backgroundColor: "#8469ff",
  },
  buttonClose: {
    backgroundColor: "#8469ff",
  },
  //text
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  //icon
  close_icon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  cover: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(132, 105, 255, 0.2)",
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
    margin: 5,
    marginLeft: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    height: "200%",
    marginTop: 15,
    justifyContent: "center",
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
    backgroundColor: "#000",
    borderRadius: 50,
  },
  gif: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalView: {
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 10,
  },
  nameCard: {
    backgroundColor: "#fcf9de",
    fontSize: 24,
    fontWeight: "bold",
    color: "#f7c911",
    width: 300,
    height: 70,
    marginTop: -45,
    lineHeight: 60,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  ipa: {
    right: -10,
  },
  meanViet: {
    color: "#8a8986",
    backgroundColor: "#fcf9de",
    fontSize: 14,
    width: 300,
    height: 30,
    textAlign: "center",
    lineHeight: 16,
  },
  meanEng: {
    color: "#000",
    backgroundColor: "#fcf9de",
    fontSize: 14,
    width: 300,
    height: 400,
    lineHeight: 16,
    marginTop: -10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  imageCard: {
    width: 250,
    height: 230,
    resizeMode: "stretch",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -250,
    borderRadius: 10,
    backgroundColor: "#fcf9de",
  },
  //icon
  btn_close_icon: {
    zIndex: 10,
    position: "absolute",
    backgroundColor: "#fff",
    right: "18%",
    top: "33%",
    paddingTop: 10,
    fontSize: 20,
  },
  sound_icon: {
    color: "#60bfeb",
    backgroundColor: "#fcf9de",
    fontSize: 24,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
    right: -24,
  },
  ipa_sound: {
    flexDirection: "row",
    color: "#8a8986",
    backgroundColor: "#fcf9de",
    fontSize: 14,
    width: 300,
    height: 40,
    marginTop: -10,
    paddingTop: 10,
    textAlign: "center",
    lineHeight: 24,
    justifyContent: "center",
  },
  add_subject_btn: {
    position: "absolute",
    backgroundColor: "#FAEAB1",
    opacity: 0.8,
    zIndex: 10,
    top: -15,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#E5BA73",
    justifyContent: "center",
    alignItems: "center",
  },
  add_icon: {
    //backgroundColor: "#000",
    color: "#000",
  },
  add_subject_modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 35,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 300,
  },
  add_subject_centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0005",
  },
  subject_view: {
    width: 200,
    height: 50,
    textAlign: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    //borderWidth: 2,
    borderColor: COLOR.four,
    marginBottom: 5,
    backgroundColor: COLOR.fourth,
  },
  btn_add: {
    backgroundColor: COLOR.three,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subject_name: {
    maxWidth: 100,
    height: 25,
    lineHeight: 25,
    overflow: "hidden",
  },
});
