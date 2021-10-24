import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./navigation/Root";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";

// const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
// const loadImages = (images) =>
//   images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//       //on the web await Image.petch()
//     }
//     return Asset.loadAsync(image);
//   });

export default function App() {
  const [assets] = useAssets([require("./assets/somiFace.jpg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </ThemeProvider>
  );
}
