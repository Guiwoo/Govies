import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../components/Slide";
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
const ListContainer = styled.View`
  margin-bottom: 30px;
`;
const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 15px;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 90%;
`;
const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  font-size: 12px;
  margin: 10px 0;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
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
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
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
      <ListContainer>
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
              <Votes>
                {m.vote_average > 0 ? `⭐️${m.vote_average}/10` : `Coming soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map((m) => (
        <HMovie key={m.id}>
          <Poster path={m.poster_path} />
          <HColumn>
            <Title>
              {m.original_title}
              {m.original_title.length > 12 ? ".." : ""}
            </Title>
            <Release>
              {new Date(m.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
            <Overview>
              {m.overview !== "" && m.overview.length > 140
                ? `${m.overview.slice(0, 140)}...`
                : m.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
