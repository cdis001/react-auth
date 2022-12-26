import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import AuthBox from "../../components/AuthBox";
import AuthInputBox from "../../components/AuthInputBox";
import AuthButton from "../../components/AuthButton";
import AuthButtonList from "../../components/AuthButtonList";

import { login } from "../../__users/api";

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const userLoginBtn = () => {
    const { status, message = "" } = login({ userId, password });
    if (status === "success") {
      localStorage.setItem("isLogin", "true");
      alert("Login Success!");
      navigate("/");
    } else {
      alert(message);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <h1>LOGIN PAGE</h1>
      <AuthBox>
        <AuthInputBox
          value={userId}
          setValue={setUserId}
          placeholder={"Email or username"}
          // errorMessage={"This email or username is not available."}
        />
        <AuthInputBox
          value={password}
          setValue={setPassword}
          placeholder={"password"}
          type={"password"}
          // errorMessage={"This password is not available."}
        />
        <AuthButton onClick={userLoginBtn} title={`로그인`} />
        <AuthButtonList>
          <li>
            <Link to="/join">회원가입</Link>
          </li>
        </AuthButtonList>
      </AuthBox>
    </section>
  );
};

export default Login;