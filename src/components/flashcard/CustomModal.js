import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { db } from "../../../config/firebase_config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export const CustomModal = ({
  //bắt buộc truyền
  modalType,
  modalVisible,
  setModalVisible,

  //dối với bộ (thêm bộ thì không cần, sửa/xóa phải đủ 3 cái)
  idSubject,
  nameSubject,
  desc,

  //đối với thẻ (thêm thẻ chỉ cần subjectIdToAdd, sửa/xóa thì 4 cái còn lại)
  idCard,
  nameCard,
  defi,
  favo,
  subjectIdToAdd,
}) => {
  const [inputAddNameState, setInputAddNameState] = useState("");
  const [inputAddDescState, setInputAddDescState] = useState("");
  const [inputEditNameState, setInputEditNameState] = useState(nameSubject);
  const [inputEditDescState, setInputEditDescState] = useState(desc);
  const [inputAddNameCardState, setInputAddNameCardState] = useState("");
  const [inputAddDefiState, setInputAddDefiState] = useState("");
  const [inputEditNameCardState, setInputEditNameCardState] =
    useState(nameCard);
  const [inputEditDefiState, setInputEditDefiState] = useState(defi);
  //database
  const collectionRef_subject = collection(db, "flashcard_subject");
  const collectionRef_card = collection(db, "flashcard");

  //hàm thêm bộ
  const addSubject = async () => {
    await addDoc(collectionRef_subject, {
      name: inputAddNameState,
      desc: inputAddDescState,
    });
    setInputAddNameState("");
    setInputAddDescState("");
  };

  //hàm xóa bộ
  const deleteSubject = async (id) => {
    const userDoc = doc(db, "flashcard_subject", id);
    await deleteDoc(userDoc);
    onSnapshot(collectionRef_card, (snapshot) => {
      snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((item) => item.subject == id)
        .forEach((item) => deleteCard(item.id));
    });
  };

  //hàm sửa bộ
  const editSubject = async (id) => {
    const userDoc = doc(db, "flashcard_subject", id);
    const newFields = {
      name: inputEditNameState,
      desc: inputEditDescState,
    };
    await updateDoc(userDoc, newFields);
    setInputEditNameState("");
    setInputEditDescState("");
  };

  //hàm thêm thẻ
  const addCard = async (subjectId) => {
    await addDoc(collectionRef_card, {
      name: inputAddNameCardState,
      defi: inputAddDefiState,
      subject: subjectId,
      favo: false,
    });
    setInputAddNameCardState("");
    setInputAddDefiState("");
  };

  //hàm xóa thẻ
  const deleteCard = async (id) => {
    const userDoc = doc(db, "flashcard", id);
    await deleteDoc(userDoc);
  };

  //hàm sửa thẻ
  const editCard = async (id) => {
    const userDoc = doc(db, "flashcard", id);
    const newFields = {
      name: inputEditNameCardState,
      defi: inputEditDefiState,
      favo: favo,
    };
    await updateDoc(userDoc, newFields);
    setInputEditNameCardState("");
    setInputEditDefiState("");
  };

  switch (modalType) {
    //TH thêm bộ
    case "add-subject":
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputAddNameState(newText);
                }}
                value={inputAddNameState}
                placeholder="Tên bộ..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputAddDescState(newText);
                }}
                value={inputAddDescState}
                placeholder="Mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addSubject();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Thêm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH xóa bộ
    case "delete-subject":
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <Text>Có chắc xóa hong???</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteSubject(idSubject);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH sửa bộ
    case "edit-subject": {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputEditNameState(newText);
                }}
                value={inputEditNameState}
                placeholder="Tên bộ..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputEditDescState(newText);
                }}
                value={inputEditDescState}
                placeholder="Mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  editSubject(idSubject);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cập nhật</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    }
    //TH thêm thẻ
    case "add-card":
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputAddNameCardState(newText);
                }}
                value={inputAddNameCardState}
                placeholder="Tên thẻ..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputAddDefiState(newText);
                }}
                value={inputAddDefiState}
                placeholder="Định nghĩa..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addCard(subjectIdToAdd);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Thêm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH xóa thẻ
    case "delete-card":
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <Text>Có chắc xóa hong???</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteCard(idCard);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH sửa thẻ
    case "edit-card": {
      // setInputNameState(nameSubject);
      // setInputDescState(descSubject);
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AntDesign
                name="close"
                size={20}
                color="black"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.close_icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputEditNameCardState(newText);
                }}
                value={inputEditNameCardState}
                placeholder="Tên thẻ..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputEditDefiState(newText);
                }}
                value={inputEditDefiState}
                placeholder="Định nghĩa..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  editCard(idCard);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cập nhật</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    }
    default:
      return <Text>Lỗi</Text>;
  }
};

const styles = StyleSheet.create({
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
  button: {
    width: 150,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "relative",
    top: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  //input
  input: {
    borderWidth: 1,
    borderColor: "#5F9DF7",
    borderStyle: "solid",
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 15,
    paddingBottom: 5,
    paddingRight: 5,
    width: 150,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "left",
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
});
