import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBg};
`;

const Header = styled.View`
  height: ${(props) => props.theme.height / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  align-self: flex-end;
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
  padding: 0px 20px;
`;

const DataBox = styled.View`
  padding: 0px 20px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 5px;
  line-height: 20px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

interface Videos {
  key: string;
  name: string;
}

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", colors.darkGrey]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      <DataBox>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((v: Videos) => (
          <VideoBtn key={v.key} onPress={() => openYTLink(v.key)}>
            <Ionicons name="logo-youtube" color="red" size={20} />
            <BtnText>{v.name}</BtnText>
          </VideoBtn>
        ))}
      </DataBox>
    </Container>
  );
};

export default Detail;
