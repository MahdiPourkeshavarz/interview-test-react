import { QUESTIONS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function getQuestions(options: string) {
  try {
    const response = await httpRequest.get(QUESTIONS_URL + options);
    const totalQuestions = parseInt(response.headers["x-total-count"], 10) || 0;

    return {
      questions: response.data,
      totalPages: Math.ceil(totalQuestions / 6),
    };
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
