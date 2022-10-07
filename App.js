import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Flashcard } from "./screens/Flashcard";
import { LearnVoc } from "./screens/LearnVoc";
import { Minigame } from "./screens/Minigame";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="Flashcard" component={Flashcard} />
        <Stack.Screen name="LearnVoc" component={LearnVoc} />
        <Stack.Screen name="Minigame" component={Minigame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Flashcard"
        onPress={() => navigation.navigate("Flashcard", { name: "Flashcard" })}
      />
      <Button
        title="Go to LearnVoc"
        onPress={() => navigation.navigate("LearnVoc", { name: "LearnVoc" })}
      />
      <Button
        title="Go to Minigame"
        onPress={() => navigation.navigate("Minigame", { name: "Minigame" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
