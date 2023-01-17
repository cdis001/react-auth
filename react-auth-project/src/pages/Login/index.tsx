import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

import { isLoginState } from "../../recoil/atoms";
import AuthBox from "../../components/AuthBox";
import AuthInputBox from "../../components/AuthInputBox";
import AuthButton from "../../components/AuthButton";
import AuthButtonList from "../../components/AuthButtonList";

import { login } from "../../__users/api";

type LoginDatas = {
  userId: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDatas>();
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
        <AuthInputBox
          placeholder={"Email or username"}
          isError={errors.userId}
          errorMessage={errors.userId?.message}
          register={register("userId", {
            required: "userId is required",
          })}
        />
        <AuthInputBox
          placeholder={"password"}
          type={"password"}
          isError={errors.password}
          errorMessage={errors.password?.message}
          register={register("password", {
            required: "password is required",
          })}
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
