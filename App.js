import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Flashcard } from "./src/screens/Flashcard";
import { LearnVoc } from "./src/screens/LearnVoc";
import { Minigame } from "./src/screens/Minigame";
import { FlashcardDetail } from "./src/screens/FlashcardDetail";
import { Vocabulary } from "./src/screens/Vocabulary";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Flashcard" component={Flashcard} />
        <Stack.Screen name="LearnVoc" component={LearnVoc} />
        <Stack.Screen name="Minigame" component={Minigame} />
        <Stack.Screen name="FlashcardDetail" component={FlashcardDetail} />
        <Stack.Screen name="Vocabulary" component={Vocabulary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar hidden={true} />
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
