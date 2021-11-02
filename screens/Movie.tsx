import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import { FlatList } from "react-native";
import HList from "../components/HList";

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBg};
  color: ${(props) => props.theme.textColor};
` as unknown as typeof FlatList;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // console.log(Object.values(nowPlayingData.results[0]).map((v) => typeof v));
  const trackingKey = (item: Movie) => item.id + "";

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
            {nowPlayingData?.results.map((m) => (
              <Slide
                key={m.id}
                backdropPath={m.backdrop_path || ""}
                posterPath={m.poster_path || ""}
                originalTitle={m.original_title}
                voteaverage={m.vote_average}
                overview={m.overview}
                fullData={m}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movie" data={trendingData?.results} />
          ) : null}
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;
