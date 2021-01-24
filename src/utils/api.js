export const parseResponse = (response) => {
  return response.json().then((response) => {
    if (response.error) {
      throw new Error(response.message);
    } else {
      return response;
    }
  });
};
