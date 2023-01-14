import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthBox from "../../components/AuthBox";
import AuthInputBox from "../../components/AuthInputBox";
import AuthButton from "../../components/AuthButton";
import AuthButtonList from "../../components/AuthButtonList";

import { getUserByUsername, getUserByEmail, joinUser } from "../../__users/api";

type JoinDatas = {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
};

const Join = () => {
  const { register, handleSubmit, formState, setError, getValues } =
    useForm<JoinDatas>({
      mode: "onChange",
    });

  const { errors } = formState;

  const navigate = useNavigate();

  const joinUserBtn = handleSubmit((d) => {
    const { status, message = "" } = joinUser(d);

    if (status === "success") {
      alert("회원가입 성공");
      navigate("/login");
    } else {
      alert("회원가입에 실패하셨습니다.");
    }
  });

  return (
    <section>
      <h1>JOIN</h1>
      <AuthBox>
        <AuthInputBox
          placeholder={"Email"}
          isError={errors.email}
          errorMessage={errors.email?.message}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "This email is not available.",
            },
            onBlur: (e) => {
              !!getUserByEmail(getValues("email"))
                ? setError("email", {
                    type: "duplicate",
                    message: "This email is already used",
                  })
                : null;
            },
          })}
        />
        <AuthInputBox
          placeholder={"username"}
          isError={errors.username}
          errorMessage={errors.username?.message}
          register={register("username", {
            required: "username is required",
            pattern: {
              message: "This username is not available.",
            },
            onBlur: (e) => {
              !!getUserByUsername(getValues("username"))
                ? setError("username", {
                    type: "duplicate",
                    message: "This username is already used",
                  })
                : null;
            },
          })}
        />
        <AuthInputBox
          placeholder={"password"}
          type={"password"}
          isError={errors.password}
          errorMessage={errors.password?.message}
          register={register("password", {
            required: "password is required",
            pattern: {
              value: /^[A-Za-z1~9\\d`~!@#$%^&*()-_=+]{6,}$/,
              message: "This password is not available.",
            },
          })}
        />
        <AuthInputBox
          placeholder={"passwordCheck"}
          type={"password"}
          isError={errors.passwordCheck}
          errorMessage={errors.passwordCheck?.message}
          register={register("passwordCheck", {
            required: "passwordCheck is required",
            validate: {
              positive: (text) =>
                getValues("password") === text || "Password do not match.",
            },
          })}
        />
        <AuthButton title={`회원가입`} onClick={joinUserBtn} />
        <AuthButtonList>
          <li>
            <Link to="/login">로그인 페이지로 돌아가기</Link>
          </li>
        </AuthButtonList>
      </AuthBox>
    </section>
  );
};

export default Join;
