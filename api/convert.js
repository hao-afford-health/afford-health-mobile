import { APIURL } from "../constants/Links";

export const convert = async (fileType, remotePath) => {
  const response = await fetch(`${APIURL}/convert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileType, remotePath }),
  });

  const result = await response.json();

  return result;
}