import React from "react";
import styled from "styled-components";

const AuthBtn = styled.button`
  margin-top: 20px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #6667ab;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  cursor: pointer;
`;

interface AuthButtonProps {
  title?: string;
  onClick?: () => void;
}

const AuthButton = ({ title, onClick }: AuthButtonProps) => {
  return <AuthBtn onClick={onClick}>{title}</AuthBtn>;
};

export default AuthButton;
