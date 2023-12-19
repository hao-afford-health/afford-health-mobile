import { APIURL } from "../constants/Links";

export const getFiles = async () => {
  const response = await fetch(`${APIURL}/files`);

  const results = await response.json();

  return results;
}

export const getFile = async (id) => {
  const response = await fetch(`${APIURL}/files/${id}`);

  const result = await response.json();

  return result;
}

export const postFile = async (file) => {
  const response = await fetch(`${APIURL}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file }),
  });

  const result = await response.json();

  return result;
}

export const updateFile = async (id, file) => {
  const response = await fetch(`${APIURL}/files/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file }),
  });

  const result = await response.json();

  return result;
}

export const deleteFile = async (id) => {
  const response = await fetch(`${APIURL}/files/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
}