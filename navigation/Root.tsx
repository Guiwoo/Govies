import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Root = createNativeStackNavigator();

const RootNav = () => (
  <Root.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Root.Screen name="Tabs" component={Tabs} />
    <Root.Screen name="Stack" component={Stacks} />
  </Root.Navigator>
);

export default RootNav;
