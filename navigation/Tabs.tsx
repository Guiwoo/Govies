import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Stacks from "./Stacks";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      sceneContainerStyle={{
        backgroundColor: isDark ? colors.darkGrey : "white",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? colors.darkGrey : "white",
        },
        tabBarActiveTintColor: isDark ? colors.yellow : colors.darkGrey,
        tabBarInactiveTintColor: isDark ? colors.midGrey : colors.lightGrey,
        headerStyle: {
          backgroundColor: isDark ? colors.darkGrey : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : colors.darkGrey,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
