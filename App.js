import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Flashcard } from "./src/screens/Flashcard";
import { LearnVoc } from "./src/screens/LearnVoc";
import { Minigame } from "./src/screens/Minigame";
import { FlashcardDetail } from "./src/screens/FlashcardDetail";
import { Vocabulary } from "./src/screens/Vocabulary";
import { Translate } from "./src/screens/Translate";

import { MenuProvider } from "react-native-popup-menu";
import CreateMinigame from "./src/screens/CreateMinigame";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import Toast from "react-native-toast-message";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import MyText from "./src/components/MyText";

//nhạc nền
import { useState, createContext, useContext, useEffect } from "react";
// save data of user
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserProvider, useUser } from "./src/context/userContext";
import GameResult from "./src/screens/GameResult";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  //
  const userContext = useUser();
  console.log(userContext.user);
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!userContext.user ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Flashcard"
            component={Flashcard}
            options={{
              title: "Các bộ Flashcard",
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            }}
          />
          <Stack.Screen
            name="LearnVoc"
            component={LearnVoc}
            options={{
              title: "Các bộ từ vựng",
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            }}
          />
          <Stack.Screen
            name="CreateMinigame"
            component={CreateMinigame}
            options={{
              title: "Tạo minigame",
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            }}
          />
          <Stack.Screen
            name="Minigame"
            options={{ headerShown: false }}
            component={Minigame}
          />
          <Stack.Screen
            name="GameResult"
            options={{ headerShown: false }}
            component={GameResult}
          />
          <Stack.Screen
            name="FlashcardDetail"
            component={FlashcardDetail}
            options={({ route }) => ({
              title: route.params.subjectName,
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            })}
          />
          <Stack.Screen
            name="Vocabulary"
            component={Vocabulary}
            options={({ route }) => ({
              title: route.params.subjectName,
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            })}
          />
          <Stack.Screen
            name="Translate"
            component={Translate}
            options={({ route }) => ({
              title: "Cửa sổ dịch nhanh",
              headerStyle: {
                backgroundColor: "#f0edff",
              },
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function FlashCardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Flashcard"
        component={Flashcard}
        options={{
          title: "Các bộ Flashcard",
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        }}
      />
      <Stack.Screen
        name="FlashcardDetail"
        component={FlashcardDetail}
        options={({ route }) => ({
          title: route.params.subjectName,
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        })}
      />
    </Stack.Navigator>
  );
}

function VocaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="LearnVoc"
        component={LearnVoc}
        options={{
          title: "Các bộ từ vựng",
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        }}
      />
      <Stack.Screen
        name="Vocabulary"
        component={Vocabulary}
        options={({ route }) => ({
          title: route.params.subjectName,
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        })}
      />
    </Stack.Navigator>
  );
}

function GameStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="CreateMinigame"
        component={CreateMinigame}
        options={{
          title: "Tạo minigame",
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        }}
      />
      <Stack.Screen
        name="Minigame"
        component={Minigame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameResult"
        options={{ headerShown: false }}
        component={GameResult}
      />
      <Stack.Screen
        name="Flashcard"
        component={Flashcard}
        options={{
          title: "Các bộ Flashcard",
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        }}
      />
      <Stack.Screen
        name="FlashcardDetail"
        component={FlashcardDetail}
        options={({ route }) => ({
          title: route.params.subjectName,
          headerStyle: {
            backgroundColor: "#f0edff",
          },
        })}
      />
    </Stack.Navigator>
  );
}

function App() {
  const userContext = useUser();
  return (
    <>
      <MenuProvider>
        <NavigationContainer>
          {!userContext.user ? (
            <HomeStack></HomeStack>
          ) : (
            <Tab.Navigator
              initialRouteName="Feed"
              activeColor="#6e4fff"
              screenOptions={{
                tabBarOptions: {
                  activeTintColor: "#e91e63",
                },
                headerStyle: {
                  height: 0,
                },
                showLabel: false,
                tabBarActiveTintColor: "#6e4fff",
                tabBarInactiveTintColor: "gray",
              }}
            >
              <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                  tabBarLabel: "Home",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="FlashCardStack"
                component={FlashCardStack}
                options={{
                  tabBarLabel: "Flashcard",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="cards"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="VocaStack"
                component={VocaStack}
                options={{
                  tabBarLabel: "Learn",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="bullseye-arrow"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Game"
                component={GameStack}
                options={{
                  tabBarLabel: "Game",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="gamepad-variant"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </MenuProvider>
      <Toast />
    </>
  );
}

export default () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};
