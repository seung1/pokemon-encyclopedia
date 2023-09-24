import { useEffect, useState } from "react";
import styled from "styled-components";

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;

  background-color: ${(props) => props.$show};
`;

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;

  img {
    width: 100%;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
`;

const NavBar = () => {
  const [show, setShow] = useState(false);

  const listener = () => {
    if (window.screenY > 50) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <NavWrapper $show={show ? "#090b13" : "transparent"}>
      <Logo>
        <Image
          alt="Poke logo"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`}
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
    </NavWrapper>
  );
};

export default NavBar;
