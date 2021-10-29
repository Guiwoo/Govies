import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, View } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const Container = styled.FlatList`
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
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;
const movieKeyExtractor = (item) => item.id + "";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesApi.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesApi.trending
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container
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
                backdrop_path={m.backdrop_path}
                poster_path={m.poster_path}
                original_title={m.original_title}
                vote_average={m.vote_average}
                overview={m.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              ItemSeparatorComponent={VSeperator}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
