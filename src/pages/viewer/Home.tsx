import React from 'react';
import styled from 'styled-components';

const HomeDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;
background-color: #a8dbdc;
`;

const HomeMainDiv = styled.div`
display: flex;
width: 100%;
height: 70%;
`;

const Home: React.FC = (): JSX.Element => {
  return (
    <HomeDiv>
      <h1>홈화면에 오신 여러분들 환영합니다.</h1>
      <HomeMainDiv></HomeMainDiv>
    </HomeDiv>
  );
}

export default Home;