import { APIURL } from "../constants/Links";

export const getEvents = async () => {
  const response = await fetch(`${APIURL}/events`);

  const results = await response.json();

  return results;
}

export const getEvent = async (id) => {
  const response = await fetch(`${APIURL}/events/${id}`);

  const result = await response.json();

  return result;
}

export const postEvent = async (event) => {
  const response = await fetch(`${APIURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  });

  const result = await response.json();

  return result;
}

export const updateEvent = async (id, event) => {
  const response = await fetch(`${APIURL}/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  });

  const result = await response.json();

  return result;
}

export const deleteEvent = async (id) => {
  const response = await fetch(`${APIURL}/events/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
}