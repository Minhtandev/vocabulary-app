import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  LogBox,
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
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useUser } from "../context/userContext";

const COLOR = {
  success: "#12d18e",
  wrong: "#f75555",
  progress: "#8368ff",
  button: "#34b1fd",
  primary: "#8469ff",
  second: "#f0edff",
  third: "#6e4fff",
};

const Login = ({ navigation, route }) => {
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  //
  const userContext = useUser();

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release",
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
        userContext.updateProfile({
          userId: user.userId,
          username: user.username,
        });
      } else {
        // User is signed out
        // ...
        // setUserLog(null);
      }
    });
  }, []);

  const handleSignIn = (email, password) => {
    setEmail((prev) => prev.trim());
    setIsPending(true);
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
        ToastAndroid.show("Login successfully!", ToastAndroid.LONG);
      })
      .catch((error) => {
        // console.log(error.code);
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Please use a valid email address.");
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage(
            "The password you entered does not match to this user."
          );
        } else if (error.code === "auth/internal-error") {
          setErrorMessage("Please enter your password.");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("This account does not exist.");
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
            secureTextEntry={isPasswordSecure}
            value={password}
            style={styles.input}
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
          onPress={() => handleSignIn(email, password)}
          style={{
            ...styles.button,
            backgroundColor: isPending ? COLOR.second : COLOR.third,
          }}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "700" }}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.registerGroup}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          // onPress={handleSignUp}
          onPress={() => navigation.navigate("Register")}
          style={styles.register}
        >
          <Text
            style={{
              color: COLOR.primary,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
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
