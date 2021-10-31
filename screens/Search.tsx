import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";

const Container = styled.ScrollView``;
const Searchbar = styled.TextInput`
  background-color: ${(props) => props.theme.searchColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 80%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  console.log(tvData, moviesData);
  return (
    <Container>
      <Searchbar
        placeholder="Search for Movie or TV..."
        placeholderTextColor="white"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
};

export default Search;
