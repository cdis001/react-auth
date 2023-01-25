import React from "react";
import styled from "styled-components";

const AuthBoxDiv = styled.div`
  display: flex;
  padding: 20px;
  width: 460px;
  box-sizing: border-box;
  //   border: 1px solid #d1d5db;
  box-shadow: 10px 10px 30px #e4e4e7;
  border-radius: 4px;
  flex-direction: column;
`;

interface AuthBoxProps {
  children?: React.ReactNode;
}

const AuthBox = ({ children }: AuthBoxProps) => {
  return <AuthBoxDiv>{children}</AuthBoxDiv>;
};

export default AuthBox;
