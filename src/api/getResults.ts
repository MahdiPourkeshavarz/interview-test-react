import { TESTS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getResults(options: string) {
  try {
    const response = await httpRequest.get(TESTS_URL + options);
    const totalQuestions = parseInt(response.headers["x-total-count"], 10) || 0;

    return {
      results: response.data,
      totalPages: Math.ceil(totalQuestions / 2),
    };
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
