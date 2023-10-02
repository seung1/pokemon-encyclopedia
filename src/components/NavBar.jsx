import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const initUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(initUserData);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/pokemon-encyclopedia/login");
      } else if (user & (pathname === "/pokemon-encyclopedia/login")) {
        navigate("/pokemon-encyclopedia/");
      }
    });
    // 유저 스테이트가 체인지가 되어야 호출된다 -> 링크를 통한 이동과 클릭해서 이동하는건 다른 동작
    return () => {
      unSubscribe();
    };
  }, [pathname]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const formatUserData = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        setUserData(formatUserData);
        console.log(result.user);
        localStorage.setItem("userData", JSON.stringify(formatUserData));
        navigate("/pokemon-encyclopedia/");
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        navigate("/pokemon-encyclopedia/login");
      })
      .catch((err) => {
        alert(err);
      });
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
      ) : (
        <SignOut>
          <UserImg src={userData.photoURL} alt="userPhoto" />
          <Dropdown>
            <span onClick={handleLogout}>Sign out</span>
          </Dropdown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

export default NavBar;
