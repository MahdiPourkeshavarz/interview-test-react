import { QUESTIONS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { questionData } from "../types";

export async function createQuestion(questionData: questionData) {
  try {
    await httpRequest.post(QUESTIONS_URL, questionData);
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
