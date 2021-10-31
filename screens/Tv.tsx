import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeperator } from "../components/HList";
import { RefreshControl } from "react-native";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const { isLoading: trendLoading, data: trendData } = useQuery(
    ["tv", "trend"],
    tvApi.trending
  );
  const loading = todayLoading || topLoading || trendLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <HList title="Trending Tv" data={trendData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated Tv" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
