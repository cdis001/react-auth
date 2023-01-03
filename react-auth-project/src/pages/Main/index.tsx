import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { isLoginState } from "../../recoil/atoms";
import AuthBox from "../../components/AuthBox";
import AuthInputBox from "../../components/AuthInputBox";
import AuthButton from "../../components/AuthButton";
import AuthButtonList from "../../components/AuthButtonList";

const Main = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const userLogoutBtn = () => {
    setIsLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  return (
    <section>
      <h1>HELLO</h1>
      <AuthButton onClick={userLogoutBtn} title={`로그아웃`} />
    </section>
  );
};

export default Main;
