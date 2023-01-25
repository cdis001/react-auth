import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AuthInputDiv = styled.div`
  display: flex;
  flex-direction: column;

  & > input {
    height: 38px;
    padding: 8px 12px;
    box-sizing: border-box;
    margin: 10px 0;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
  }

  & > input::placeholder {
    color: #ccc;
  }

  & > input:focus {
    outline: none;
    border: 1px solid #949494;
  }

  & > p {
    margin: 0;
    color: #dc2626;
    font-size: 12px;
  }
`;

interface AuthInputBoxProps {
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  type?: string;
  register?: Object;
}

const AuthInputBox = ({
  placeholder,
  isError = false,
  errorMessage = "",
  type = "text",
  register = {},
}: AuthInputBoxProps) => {
  return (
    <AuthInputDiv>
      <input placeholder={placeholder} type={type} {...register} />
      <p>{isError ? errorMessage : null}</p>
    </AuthInputDiv>
  );
};

export default AuthInputBox;
