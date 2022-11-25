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
// import { auth } from "../../config/firebase_config";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { LogBox } from "react-native";

const Login = ({ navigation, route }) => {
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

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
        // const data = { userId: user.uid };
        // console.log(JSON.stringify(data));
        // AsyncStorage.setItem("userData", JSON.stringify(data));
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputForm}>
          <Octicons
            name="mention"
            size={20}
            color="#176ed2"
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
            color="#176ed2"
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
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerGroup}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          // onPress={handleSignUp}
          onPress={() => navigation.navigate("Register")}
          style={styles.register}
        >
          <Text style={{ color: "#2874f9", fontWeight: "700", fontSize: 16 }}>
            Register
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
    backgroundColor: "#2874f9",
    marginTop: 5,
  },
  buttonOutlineText: {
    borderWidth: 1,
    borderColor: "#2874f9",
    backgroundColor: "#fff",
  },
  registerGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  register: {
    color: "#2874f9",
    fontWeight: "bold",
  },
});

export default Login;
