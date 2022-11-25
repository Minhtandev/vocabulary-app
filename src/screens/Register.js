import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { LogBox } from "react-native";
import { db } from "../../config/firebase_config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Register = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        navigation.navigate("Home");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  // LogBox.ignoreLogs([user]);
  // console.log(user);

  // lưu user lên database
  const collectionRef_user = collection(db, "user");

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("Register with: ", user.email);
        await addDoc(collectionRef_user, {
          userId: user?.uid || "xxxx",
          username,
        });
      })
      .catch((error) => alert(error.message));
    // await addDoc(collectionRef_user, {
    //   userId: user.uid,
    //   username,
    // });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputForm}>
          <Octicons
            name="person"
            size={20}
            color="#92d546"
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Username"
            value={username}
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          ></TextInput>
        </View>
        <View style={styles.inputForm}>
          <Octicons
            name="mention"
            size={20}
            color="#92d546"
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
        <View style={styles.inputForm}>
          <Octicons
            name="lock"
            size={20}
            color="#92d546"
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Create account
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginGroup}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.login}
        >
          <Text style={{ color: "#92d546", fontWeight: "700", fontSize: 16 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  inputForm: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: "80%",
    marginBottom: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#92d546",
    marginTop: 5,
  },
  buttonOutlineText: {
    borderWidth: 1,
    borderColor: "#92d546",
    backgroundColor: "#fff",
  },
  loginGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  login: {
    color: "#2874f9",
    fontWeight: "bold",
  },
});

export default Register;
