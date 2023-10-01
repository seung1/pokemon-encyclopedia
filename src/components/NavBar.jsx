import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getImageUrl } from "../utils/url";
import app from "../../firebase";

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

  background-color: ${(props) => (props.$show ? "#090b13" : "transparent")};
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

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    berder-color: transparent;
  }
`;

const NavBar = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const listener = () => {
    if (window.scrollY > 50) setShow(true);
    else setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [window]);

  return (
    <NavWrapper $show={show}>
      <Logo>
        <Image
          alt="Poke logo"
          src={getImageUrl(25)}
          onClick={() => (window.location.href = "/pokemon-encyclopedia/")}
        />
      </Logo>

      {pathname === "/pokemon-encyclopedia/login" ? (
        <Login onClick={handleAuth}>로그인</Login>
      ) : null}
    </NavWrapper>
  );
};

export default NavBar;
