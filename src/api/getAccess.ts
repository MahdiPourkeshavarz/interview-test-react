import { USER_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function submitUser(formdata): Promise<boolean> {
  const email = formdata.email;
  const password = formdata.password;
  try {
    const response = await httpRequest.post(USER_URL, {
      email,
      password,
    });
    const accessToken = await response.data.token.accessToken;
    const refreshToken = await response.data.token.refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
