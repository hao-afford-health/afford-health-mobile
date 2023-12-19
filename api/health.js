import { APIURL } from "../constants/Links";

export const getHealth = async () => {
  const response = await fetch(`${APIURL}/health`);

  const result = await response.json();

  return result;
}