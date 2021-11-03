import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeperator } from "../components/HList";
import { RefreshControl } from "react-native";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    hasNextPage: hasNextToday,
    fetchNextPage: fetchNextToday,
  } = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
    getNextPageParam(current) {
      console.log(current);
      const nextPage = current.page + 1;
      return nextPage > current.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: topLoading,
    data: topData,
    hasNextPage: hasNextTop,
    fetchNextPage: fetchNextTop,
  } = useInfiniteQuery(["tv", "top"], tvApi.topRated, {
    getNextPageParam(current) {
      const nextPage = current.page + 1;
      return nextPage > current.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: trendLoading,
    data: trendData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["tv", "trend"], tvApi.trending, {
    getNextPageParam(current) {
      const nextPage = current.page + 1;
      return nextPage > current.total_pages ? null : nextPage;
    },
  });
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
      <HList
        title="Trending Tv"
        data={trendData?.pages.map((page) => page.results).flat()}
        hasNext={hasNextPage}
        fetchNext={fetchNextPage}
      />
      <HList
        title="Airing Today"
        data={todayData?.pages.map((page) => page.results).flat()}
        hasNext={hasNextToday}
        fetchNext={fetchNextToday}
      />
      <HList
        title="Top Rated Tv"
        data={topData?.pages.map((page) => page.results).flat()}
        hasNext={hasNextTop}
        fetchNext={fetchNextTop}
      />
    </ScrollView>
  );
};

export default Tv;
