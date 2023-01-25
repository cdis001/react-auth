import React from "react";
import styled from "styled-components";

const AuthBtnList = styled.ul`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`;

interface AuthButtonListProps {
  children?: React.ReactNode;
}

const AuthButtonList = ({ children }: AuthButtonListProps) => {
  return <AuthBtnList>{children}</AuthBtnList>;
};

export default AuthButtonList;
