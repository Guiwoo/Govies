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
import { ScrollView } from "react-native-gesture-handler";
import Poster from "../components/Poser";

const API_KEY = "2384348b5a6b3811901d3b50c7882207";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBg};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;
const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin: 7px 0 5px 0px;
`;
const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  font-size: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
      )
    ).json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
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
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
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
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending?.map((m) => (
          <Movie key={m.id}>
            <Poster path={m.poster_path} />
            <Title>
              {m.original_title.slice(0, 12)}
              {m.original_title.length > 12 ? ".." : ""}
            </Title>
            <Votes>⭐️{m.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
