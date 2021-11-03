import React from "react";
import { InfiniteQueryObserverResult } from "react-query";
import { MovieResponse, TvResponse } from "./api";

type MovieFetch =Promise<InfiniteQueryObserverResult<MovieResponse, unknown>>;
type TVFetch =Promise<InfiniteQueryObserverResult<TvResponse, unknown>>

export type FetchNext = ()=>  TVFetch | MovieFetch

export const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

export const fetchMore = (hasNext:boolean | undefined,fetchNext:FetchNext) => hasNext ? fetchNext():null