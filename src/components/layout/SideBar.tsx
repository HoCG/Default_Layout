import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideBarDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 10%;
  height: 100%;
  background-color: #f9dbdc;
`;

const SideBarBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 20%;
  margin-bottom: 1%;
  border-radius: 25px;
  font-size: larger;
  background-color: #2ec4c9;
  font-weight: 800;
  cursor: pointer;
`;

const SideBar: React.FC = (): JSX.Element => {
  return (
    <SideBarDiv>
      <SideBarBtn>
        <Link to="/profile">프로필</Link>
      </SideBarBtn>
      <SideBarBtn>
        <Link to="/">홈</Link>
      </SideBarBtn>
    </SideBarDiv>
  );
}

export default SideBar;