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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogBox } from "react-native";

const Login = ({ params }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const auth = getAuth();

  const navigation = useNavigation();

  useEffect(() => {
    // const unsubcribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     navigation.navigate("Home");
    //   }
    // });
    // return unsubcribe;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        navigation.navigate("Home");
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  // LogBox.ignoreLogs([user]);
  // console.log(user);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Register with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };
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
            name="person"
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
        <TouchableOpacity
          onPress={handleSignUp}
          style={{ ...styles.button, ...styles.buttonOutlineText }}
        >
          <Text style={{ color: "#2874f9", fontWeight: "700" }}>Register</Text>
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
    width: "50%",
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
});

export default Login;
