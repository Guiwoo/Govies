import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Movie } from "../api";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 45%;
  margin-left: 30px;
`;

const OverView = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(OverView)<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteaverage: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteaverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const goDetail = () =>
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={70}
        style={StyleSheet.absoluteFill}
      >
        <TouchableOpacity onPress={goDetail}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteaverage > 0 ? (
                <Votes isDark={isDark}>⭐️ {voteaverage}/10</Votes>
              ) : null}
              <OverView isDark={isDark}>{overview.slice(0, 100)}...</OverView>
            </Column>
          </Wrapper>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default Slide;
