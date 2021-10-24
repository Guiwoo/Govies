import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.TouchableOpacity``;
const Title = styled.Text`
  color: blue;
`;

//navigate("Navigator which i want to move", {screen:"Which i want to move scrren in Navigator"})
const Movies = ({ navigation: { navigate } }) => (
  <Container>
    <Btn onPress={() => navigate("Stack", { screen: "One" })}>
      <Title>Movies</Title>
    </Btn>
  </Container>
);

export default Movies;
