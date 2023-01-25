import { users } from "../index";

interface JoinUserDataProps {
  id?: number;
  email: string;
  username: string;
  password: string;
}

interface LoginUserDataProps {
  id?: number;
  userId: string;
  password: string;
}

export const getUserByUsername = (username: string) => {
  return users.filter((data) => data.username === username)[0] || null;
};

export const getUserByEmail = (email: string) => {
  return users.filter((data) => data.email === email)[0] || null;
};

export const joinUser = (userData: JoinUserDataProps) => {
  try {
    users.push({
      id: users.reduce((maxId, user) => Math.max(user.id, maxId), -1) + 1,
      ...userData,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "fail", message: "Get Error" };
  }
};

export const login = (userData: LoginUserDataProps) => {
  try {
    const user = getUserByEmailOrUsername(userData.userId || "");
    if (!user) {
      return { status: "fail", message: "User Not Found" };
    } else {
      if (user.password == userData.password) {
        return { status: "success" };
      } else {
        return { status: "fail", message: "User id and Password do not match" };
      }
    }
  } catch (error) {
    return { status: "fail", message: "Get Error" };
  }
};

const getUserByEmailOrUsername = (userId: string) => {
  return users.filter(
    (data) => data.email === userId || data.username === userId
  )[0];
};
