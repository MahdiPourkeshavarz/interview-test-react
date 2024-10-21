import { TESTS_URL } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { resultData } from "../types";

export async function createTestResult(resultData: resultData) {
  try {
    await httpRequest.post(TESTS_URL, resultData);
  } catch (e) {
    throw new Error(`something went wrong ${e}`);
  }
}
