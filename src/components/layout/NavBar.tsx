import React from 'react';
import styled from 'styled-components';

const NavbarDiv = styled.div`
display: flex;
height: 10%;
width: 100%;
`;
const NavbarMainText = styled.div`
display: flex;
width: 80%;
align-items: center;
flex-direction: column;
color: black;
`;

const Navbar: React.FC = (): JSX.Element => {
  return (
    <NavbarDiv>
      <NavbarMainText>
        <h1>메인 텍스트</h1>
      </NavbarMainText>
    </NavbarDiv>
  );
}

export default Navbar;