import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const MovieView = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string | null;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const goDetail = () => navigation.navigate("Stack", { screen: "Detail" });
  return (
    <TouchableOpacity onPress={goDetail}>
      <MovieView>
        <Poster path={posterPath || ""} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </MovieView>
    </TouchableOpacity>
  );
};

export default VMedia;
