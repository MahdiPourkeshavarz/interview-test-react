import { TESTS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getQuestions<T>(options: string): Promise<Partial<T>> {
  try {
    const response = await httpRequest.get(TESTS_URL + options);
    return response.data;
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
