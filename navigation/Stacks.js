import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const Stack = createNativeStackNavigator();

const ScOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const ScThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("One")}>
    <Text>Three</Text>
  </TouchableOpacity>
);

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="One" component={ScOne} />
      <Stack.Screen name="Two" component={ScTwo} />
      <Stack.Screen name="Three" component={ScThree} />
    </Stack.Navigator>
  );
};

export default Stacks;
