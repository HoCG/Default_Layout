import React from 'react';
import MainView from '../components/layout/MainContainer';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import styled from 'styled-components';


const MainPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1600px;
  height: 900px;
`;


const MainPage: React.FC = () => {
  return (
    <MainPageDiv>
      <NavBar></NavBar>
      <MainView></MainView>
      <Footer></Footer>
    </MainPageDiv>
  );
}

export default MainPage;