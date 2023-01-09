import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

import { isLoginState } from "../../recoil/atoms";
import AuthBox from "../../components/AuthBox";
// import AuthInputBox from "../../components/AuthInputBox";
import AuthButton from "../../components/AuthButton";
import AuthButtonList from "../../components/AuthButtonList";

import { login } from "../../__users/api";

const AuthInput = styled.input`
  height: 38px;
  padding: 8px 12px;
  box-sizing: border-box;
  margin: 10px 0;
  border: 1px solid #dbdbdb;
  border-radius: 4px;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border: 1px solid #949494;
  }

  & > p {
    margin: 0;
    color: #dc2626;
    font-size: 12px;
  }

  & > .hidden {
    visibility: hidden;
  }
`;

type LoginDatas = {
  userId: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginDatas>();
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const navigate = useNavigate();

  const userLoginBtn = handleSubmit((d) => {
    const { status, message = "" } = login(d);
    if (status === "success") {
      setIsLogin(true);
      alert("Login Success!");
      navigate("/");
    } else {
      alert(message);
    }
  });

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <section>
      <h1>LOGIN PAGE</h1>
      <AuthBox>
        <AuthInput placeholder={"Email or username"} {...register("userId")} />
        <AuthInput
          placeholder={"password"}
          type="password"
          {...register("password")}
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
