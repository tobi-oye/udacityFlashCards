import React, { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStackNavigator } from "@react-navigation/stack";
import reducer from "./reducers/index";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import QuizAndroid from "./components/Quiz/components/QuizAndroid";
import { setLocalNotification } from "./utils/helpers";

const Stack = createStackNavigator();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="DeckDetail" component={DeckDetail} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="QuizAndroid" component={QuizAndroid} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => setLocalNotification(), []);
  return (
    <Provider store={store}>
      <StatusBar animated={true} hidden={false} />
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
