import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { LogBox } from "react-native";
import { db } from "../../config/firebase_config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useUser } from "../context/userContext";

const COLOR = {
  primary: "#19ce30",
  test: "#92d546",
};

const emailRe =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  //
  const userContext = useUser();
  //

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // navigation.navigate("Home");
        // ...
        userContext.updateProfile({
          userId: user.userId,
          username: user.username,
        });
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

  const handleSignUp = async (email, password) => {
    if (username === "") {
      setErrorMessage("Please enter your username");
      setIsPending(false);
    } else {
      setUsername((username) => username.trim());
      const userN = username.trim();
      if (userN.trim().length < 6 || userN.trim().length > 20) {
        setErrorMessage("Username is 8-20 characters long.");
      } else if (!userN.match(/^[a-zA-Z0-9]+$/)) {
        setErrorMessage(
          "Username should only contains alphanumeric characters."
        );
      } else if (!email.match(emailRe)) {
        setErrorMessage("Please use a valid email address.");
      } else {
        setEmail((prev) => prev.trim());
        setIsPending(true);
        createUserWithEmailAndPassword(auth, email.trim(), password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            console.log("Register with: ", user.email);
            await addDoc(collectionRef_user, {
              userId: user?.uid || "xxxx",
              username: userN,
            });
            ToastAndroid.show("Register successfully!", ToastAndroid.LONG);
          })
          .catch((error) => {
            // console.log(error.code);
            if (error.code === "auth/invalid-email") {
              setErrorMessage("Please use a valid email address.");
            } else if (error.code === "auth/email-already-in-use") {
              setErrorMessage("This email address is already used.");
            } else if (error.code === "auth/internal-error") {
              setErrorMessage("Please enter your password.");
            } else if (error.code === "auth/weak-password") {
              setErrorMessage("Password should be at least 6 characters.");
            } else if (error.code === "auth/too-many-requests") {
              setErrorMessage(
                "You've tried to sign in to many times for your protection, you can't sign in right now. Try again later or sign in from a different device"
              );
            } else {
              setErrorMessage(error.message);
            }
            // alert(error.message);
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    }
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
            color={COLOR.primary}
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Username"
            value={username}
            style={styles.input}
            onChangeText={(text) => {
              setUsername(text);
              setErrorMessage("");
            }}
          ></TextInput>
        </View>
        <View style={styles.inputForm}>
          <Octicons
            name="mention"
            size={15}
            color={COLOR.primary}
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
          ></TextInput>
        </View>
        <View style={styles.inputForm}>
          <Octicons
            name="lock"
            size={20}
            color={COLOR.primary}
            style={{
              paddingHorizontal: 15,
              paddingLeft: 15,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.input}
            secureTextEntry={isPasswordSecure}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              isPasswordSecure
                ? setIsPasswordSecure(false)
                : setIsPasswordSecure(true);
            }}
            style={{ position: "absolute", right: 12 }}
          >
            <MaterialCommunityIcons
              name={isPasswordSecure ? "eye-off" : "eye"}
              size={20}
              color={COLOR.primary}
            />
          </TouchableOpacity>
        </View>
        {errorMessage && (
          <View style={{ marginVertical: 14 }}>
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSignUp(email, password)}
          style={{
            ...styles.button,
            backgroundColor: isPending ? "#65b66f" : COLOR.primary,
          }}
        >
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Create account
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.loginGroup}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{ color: COLOR.primary, fontWeight: "700", fontSize: 16 }}
          >
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
    backgroundColor: COLOR.primary,
    marginTop: 5,
  },
  buttonOutlineText: {
    borderWidth: 1,
    borderColor: COLOR.primary,
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
