import React from 'react';
import SideBar from './SideBar';
import MainView from './MainView';
import styled from 'styled-components';

const MainContainerDiv = styled.div`
  display: flex;
  height: 80%;
`;


const MainContainer: React.FC = (): JSX.Element => {
  return (
    <MainContainerDiv>
      <SideBar></SideBar>
      <MainView></MainView>
    </MainContainerDiv>
  );
}

export default MainContainer;