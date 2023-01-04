const getData = () => {
  return fetch(
    'https://23.javascript.pages.academy/keksobooking/data'
  )
  .then((response) => response.json())
    .then((data) => data)
    .catch(() => {

    });
};

export {getData};
