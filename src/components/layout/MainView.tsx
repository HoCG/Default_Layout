import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/viewer/Home';
import Profile from '../../pages/viewer/Profile';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
`;

const MainView: React.FC = (): JSX.Element => {
  return (
    <MainDiv>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MainDiv>
  );
}

export default MainView;