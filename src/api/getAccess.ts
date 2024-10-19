import { PROFILES_URL, USER_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { userData } from "../types";

export async function submitUser(userData: userData): Promise<boolean> {
  const email = userData.email;
  const password = userData.password;
  try {
    const response = await httpRequest.post(USER_URL, {
      email,
      password,
    });
    const accessToken = await response.data.token.accessToken;
    const refreshToken = await response.data.token.refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    await httpRequest.post(PROFILES_URL, {
      email: userData.email,
      username: userData.username,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}