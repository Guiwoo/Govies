import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { Image } from "react-native";

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
  const [loaded] = Font.useFonts([Ionicons.font]);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return null;
}
