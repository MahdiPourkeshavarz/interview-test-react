import { QUESTIONS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";

export async function deleteQuestion(questionId: number) {
  try {
    await httpRequest.delete(`${QUESTIONS_URL}/${questionId}`);
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
