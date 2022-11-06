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

export const CustomModal = ({
  modalType,
  modalVisible,
  setModalVisible,
  idSubject,
  idCard,
  subjectIdToAdd,
}) => {
  const [inputNameState, setInputNameState] = useState("");
  const [inputDescState, setInputDescState] = useState("");
  const [inputNameCardState, setInputNameCardState] = useState("");
  const [inputDefiState, setInputDefiState] = useState("");
  //database
  const collectionRef_subject = collection(db, "flashcard_subject");
  const collectionRef_card = collection(db, "flashcard");

  //hàm thêm bộ
  const addSubject = async () => {
    await addDoc(collectionRef_subject, {
      name: inputNameState,
      desc: inputDescState,
    });
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
      name: inputNameState,
      desc: inputDescState,
    };
    await updateDoc(userDoc, newFields);
  };

  //hàm thêm thẻ
  const addCard = async (subjectId) => {
    await addDoc(collectionRef_card, {
      name: inputNameCardState,
      defi: inputDefiState,
      subject: subjectId,
    });
  };

  //hàm xóa bộ
  const deleteCard = async (id) => {
    const userDoc = doc(db, "flashcard", id);
    await deleteDoc(userDoc);
  };

  //hàm sửa bộ
  const editCard = async (id) => {
    const userDoc = doc(db, "flashcard", id);
    const newFields = {
      name: inputNameCardState,
      defi: inputDefiState,
    };
    await updateDoc(userDoc, newFields);
  };

  switch (modalType) {
    //TH thêm bộ
    case "add-subject":
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputNameState(newText);
                }}
                value={inputNameState}
                placeholder="Nhập tên..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputDescState(newText);
                }}
                value={inputDescState}
                placeholder="Nhập mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addSubject();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH xóa bộ
    case "delete-subject":
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Có chắc xóa hong???</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteSubject(idSubject);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH sửa bộ
    case "edit-subject": {
      // setInputNameState(nameSubject);
      // setInputDescState(descSubject);
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputNameState(newText);
                }}
                value={inputNameState}
                placeholder="Nhập tên..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputDescState(newText);
                }}
                value={inputDescState}
                placeholder="Nhập mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  editSubject(idSubject);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputNameCardState(newText);
                }}
                value={inputNameCardState}
                placeholder="Nhập tên..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputDefiState(newText);
                }}
                value={inputDefiState}
                placeholder="Nhập mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addCard(subjectIdToAdd);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      );
    //TH xóa thẻ
    case "delete-card":
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Có chắc xóa hong???</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteCard(idCard);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputNameCardState(newText);
                }}
                value={inputNameCardState}
                placeholder="Nhập tên..."
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => {
                  setInputDefiState(newText);
                }}
                value={inputDefiState}
                placeholder="Nhập mô tả..."
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  editCard(idCard);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
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
    borderRadius: 20,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
