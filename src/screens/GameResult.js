import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../components/MyText";
import image from "../../assets/gameBg1.jpg";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase_config";
import Toast from "react-native-toast-message";
import { useUser } from "../context/userContext";
import { CustomModal } from "../components/flashcard/CustomModal";
import { Audio } from "expo-av";
const COLOR = {
  success: "#12d18e",
  wrong: "#f75555",
  progress: "#8368ff",
  button: "#34b1fd",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
  border: "#abacce",
};

const Item = ({ anh, viet, onPress = () => {} }, isAdded = true) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: COLOR.border,
        marginTop: 10,
        borderRadius: 16,
      }}
    >
      <MyText style={{ ...styles.text }} weight={700}>
        {anh}
      </MyText>
      <MyText
        style={{
          ...styles.text,
          flex: 1,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        {viet}
      </MyText>
      {isAdded === true ? (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          // onPress={onPress}
        >
          <MyText style={{ ...styles.text }}>Done </MyText>
          <Image
            style={{ width: 18, height: 18 }}
            source={require("../../assets/icons/done.png")}
          />
        </Pressable>
      ) : (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onPress}
        >
          <MyText style={{ ...styles.text }}>Add </MyText>
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../../assets/icons/plus.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

const GameResult = ({ navigation, route }) => {
  let data = route.params?.data || {};
  // console.log("game result >>> ", data);

  // --- user
  const userContext = useUser();
  const userId = userContext.user?.userId;
  // state bộ từ
  const [subjectArrState, setSubjetArrState] = useState([]);
  //database
  const collectionRef = collection(db, "flashcard_subject");
  useEffect(
    () =>
      onSnapshot(collectionRef, (snapshot) => {
        setSubjetArrState(
          [
            ...snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter((item) => item.user == userId),
          ]
          // .push(favourite)
        );
      }),
    []
  );

  //
  const [modalVisible, setModalVisible] = useState(false);
  const [anhC, setAnhC] = useState("");
  const [vietC, setVietC] = useState("");
  const [addedVoc, setAddedVoc] = useState([]);

  // xử lý đóng phần MODAL ADD
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  // xử lý của 1 item
  const handleAddToFlashCard = (anh, viet) => {
    setAnhC(anh);
    setVietC(viet);
    setModalVisible(true);
  };
  // thêm 1 bộ flashcard mới
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const handleAddSubject = () => {
    setModalAddVisible(true);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <ScrollView
        style={{ width: "100%", minHeight: "100%", paddingVertical: 10 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/***** top *****/}
          <View style={{ height: 60, ...styles.top }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText style={{ fontSize: 20, marginRight: 10 }} weight={700}>
                Result
              </MyText>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/icons/choice.png")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText
                style={{ color: COLOR.success, fontSize: 16 }}
                weight={800}
              >
                {data?.score}{" "}
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require("../../assets/icons/dung.png")}
                />
              </MyText>
              <MyText
                style={{ color: COLOR.wrong, fontSize: 16, marginLeft: 10 }}
                weight={800}
              >
                {data?.wrong}{" "}
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require("../../assets/icons/sai.png")}
                />
              </MyText>
            </View>
          </View>
          {/***** main *****/}
          <View style={{ flex: 2, ...styles.main }}>
            <View style={{}}>
              <MyText
                style={{
                  color: COLOR.wrong,
                  fontSize: 20,
                }}
                weight={800}
              >
                Các từ sai và chưa làm
              </MyText>
              {data?.wrongResult &&
                data?.wrongResult?.length > 0 &&
                data?.wrongResult.map((item) => (
                  <Item
                    anh={item.anh}
                    viet={item.viet}
                    key={item.anh}
                    onPress={() => handleAddToFlashCard(item.anh, item.viet)}
                    isAdded={addedVoc.includes(item.anh)}
                  ></Item>
                ))}

              {!data?.wrongResult || data?.wrongResult?.length == 0 ? (
                <MyText style={{ ...styles.text, marginTop: 5 }}>
                  Bạn giỏi quá, hong có từ nào sai hết &#128536;
                </MyText>
              ) : null}
            </View>
            <View style={{}}>
              <MyText
                style={{
                  color: COLOR.success,
                  fontSize: 20,
                  marginTop: 20,
                }}
                weight={800}
              >
                Các từ đúng
              </MyText>
              {data?.correctResult &&
                data?.correctResult?.length > 0 &&
                data?.correctResult.map((item, index) => (
                  <Item
                    anh={item.anh.trim()}
                    viet={item.viet}
                    key={index}
                    onPress={() => handleAddToFlashCard(item.anh, item.viet)}
                    isAdded={addedVoc.includes(item.anh.trim())}
                  ></Item>
                ))}
              {!data?.correctResult || data?.correctResult?.length == 0 ? (
                <MyText style={{ ...styles.text, marginTop: 5 }}>
                  Chưa có từ nào đúng hết á, cố gắng thêm bạn nha &#128536;
                </MyText>
              ) : null}
            </View>
          </View>
          {/***** bottom *****/}
          <View style={{ ...styles.bottom }}>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  ...styles.buttonMini,
                  backgroundColor: COLOR.second,
                  borderWidth: 1,
                  borderColor: COLOR.primary,
                }}
                onPress={() =>
                  navigation.navigate("CreateMinigame", {
                    name: "CreateMinigame",
                  })
                }
              >
                <MyText
                  style={{
                    ...styles.text,
                    color: COLOR.primary,
                    fontSize: 16,
                  }}
                  weight={700}
                >
                  Chơi lại
                </MyText>
              </Pressable>
              <Pressable
                style={styles.buttonMini}
                onPress={() =>
                  navigation.navigate("Flashcard", {
                    name: "Flashcard",
                  })
                }
              >
                <MyText
                  style={{
                    color: "#fff",
                    fontSize: 16,
                  }}
                  weight={700}
                >
                  Flashcards
                </MyText>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL thêm bộ flashcard */}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Closed.");
            setModalVisible(false);
          }}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleCloseModal}
          >
            {/* main */}
            <Pressable
              style={{
                width: "100%",
                height: "60%",
                borderRadius: 30,
                marginTop: "auto",
                backgroundColor: COLOR.primary,
                justifyContent: "space-evenly",
                alignItems: "baseline",
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  marginTop: 10,
                  backgroundColor: "#fff",
                  padding: 30,
                  justifyContent: "space-evenly",
                  alignItems: "baseline",
                }}
              >
                {/* top */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <MyText
                    style={{
                      fontSize: 16,
                      marginBottom: 10,
                      color: COLOR.primary,
                    }}
                    weight={900}
                  >
                    Thêm vào bộ từ...
                  </MyText>
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={handleAddSubject}
                  >
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require("../../assets/icons/plus.png")}
                    />
                    <MyText weight={700}> Bộ từ mới</MyText>
                  </Pressable>
                </View>
                {/* danh sách bộ từ */}
                <View style={{ flex: 1 }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={subjectArrState}
                    renderItem={({ item }) => (
                      <ItemFlashCard
                        name={item.name}
                        id={item.id}
                        anh={anhC}
                        viet={vietC}
                        setModalVisible={setModalVisible}
                        setAddedVoc={setAddedVoc}
                      ></ItemFlashCard>
                    )}
                  />
                </View>
                {/* group button */}
                {/* <View
                  style={{
                    height: 60,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      ...styles.buttonMini,
                      width: "46%",
                      paddingVertical: 12,
                      borderRadius: 10,
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <MyText
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                      weight={900}
                    >
                      Close
                    </MyText>
                  </Pressable>
                </View> */}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}

      {/*  */}
      <CustomModal
        modalType="add-subject"
        modalVisible={modalAddVisible}
        setModalVisible={setModalAddVisible}
        userId={userId}
      ></CustomModal>
    </ImageBackground>
  );
};

export default GameResult;

const ItemFlashCard = ({
  name,
  id,
  anh,
  viet,
  setModalVisible = () => {},
  setAddedVoc = () => {},
}) => {
  //âm thanh khi thêm thành công
  const [sound, setSound] = useState();
  async function playSoundTrue() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/correct-answer.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }
  // db
  const collectionRef_card = collection(db, "flashcard");
  // function thêm thẻ vào
  const handleAddFlashCard = async () => {
    await addDoc(collectionRef_card, {
      name: anh,
      defi: viet,
      subject: id,
      favo: false,
    });
    setAddedVoc((prev) => [...prev, anh]);
    setModalVisible(false);
    Toast.show({
      type: "success",
      text1: "Thêm thành công",
      text2: "Bạn vừa thêm thành công thẻ mới!!! 👋",
    });
    playSoundTrue();
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: COLOR.border,
        marginTop: 10,
        borderRadius: 16,
      }}
    >
      <MyText style={{ ...styles.text }} weight={700}>
        {name}
      </MyText>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          setModalVisible(false);
          handleAddFlashCard();
        }}
      >
        <MyText style={{ ...styles.text }}>Add </MyText>
        <Image
          style={{ width: 10, height: 10 }}
          source={require("../../assets/icons/plus.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f0edff",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 100,
    position: "relative",
  },
  top: {
    flexDirection: "row",
    width: "90%",
    // paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR.second,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  main: {
    width: "90%",
    backgroundColor: "rgba(132, 105, 255, 0.1)",
    padding: 20,
    borderRadius: 14,
  },
  bottom: {
    marginTop: 10,
    height: 80,
    // backgroundColor: "#000",
    marginBottom: 0,
  },
  button: {
    width: "100%",
    backgroundColor: COLOR.primary,
    padding: 20,
    borderRadius: 40,
  },
  buttonMini: {
    width: "40%",
    backgroundColor: COLOR.primary,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
