import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import colors from "../colors";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? colors.darkGrey : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : colors.darkGrey,
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default Stacks;
