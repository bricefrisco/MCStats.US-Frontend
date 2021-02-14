export const parseResponse = (response) => {
  return response.json().then((response) => {
    if (response.error) {
      throw new Error(response.message);
    } else {
      return response;
    }
  });
};

export const numberWithCommas = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};