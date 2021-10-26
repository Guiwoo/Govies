import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

const API_KEY = "2384348b5a6b3811901d3b50c7882207";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBg};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies: React.FC = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
    console.log(nowPlaying);
    console.log(loading, "🇭🇰");
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        showsButtons={false}
        showsPagination={false}
      >
        {nowPlaying?.map((m) => (
          <Box key={m.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(m.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={70}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(m.poster_path) }} />
                <Column>
                  <Title isDark={isDark}>{m.original_title}</Title>
                  {m.vote_average > 0 ? (
                    <Votes isDark={isDark}>⭐️ {m.vote_average}/10</Votes>
                  ) : null}
                  <OverView isDark={isDark}>
                    {m.overview.slice(0, 100)}...
                  </OverView>
                </Column>
              </Wrapper>
            </BlurView>
          </Box>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
