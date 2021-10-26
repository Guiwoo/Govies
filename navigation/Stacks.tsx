import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { ParamListBase } from "@react-navigation/routers";

const Stack = createNativeStackNavigator();

const ScOne: React.FC<NativeStackScreenProps<ParamListBase, "One">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const ScTwo: React.FC<NativeStackScreenProps<ParamListBase, "Two">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const ScThree: React.FC<NativeStackScreenProps<ParamListBase, "Three">> = ({
  navigation: { navigate },
}) => (
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
