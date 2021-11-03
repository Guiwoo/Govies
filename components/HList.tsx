import React from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { InfiniteQueryObserverResult } from "react-query";
import styled from "styled-components/native";
import { Movie, MovieResponse, TV } from "../api";
import { fetchMore, FetchNext } from "../utils";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

interface HListprops {
  title: string;
  data: Movie[] | TV[] | undefined;
  hasNext: boolean | undefined;
  fetchNext: FetchNext;
}

const HList: React.FC<HListprops> = ({ title, data, hasNext, fetchNext }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        onEndReached={() => fetchMore(hasNext, fetchNext)}
        onEndReachedThreshold={0.3}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeperator}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_name ?? item.original_title}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
