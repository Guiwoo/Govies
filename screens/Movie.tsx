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
import Slide from "../components/Slide";

const API_KEY = "2384348b5a6b3811901d3b50c7882207";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBg};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies: React.FC = () => {
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
          <Slide
            key={m.id}
            backdrop_path={m.backdrop_path}
            poster_path={m.poster_path}
            original_title={m.original_title}
            vote_average={m.vote_average}
            overview={m.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
