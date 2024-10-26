import { USER_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { userData } from "../types";

export async function submitUser(
  userData: userData,
  mode: string
): Promise<boolean> {
  const email = userData.email;
  const password =
    mode === "login" ? userData.password : userData.repeatpassword;

  try {
    const response = await httpRequest.post(`${USER_URL}/${mode}`, {
      email,
      password,
    });
    const accessToken = await response.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    if (accessToken) {
      localStorage.setItem("username", userData.username);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
