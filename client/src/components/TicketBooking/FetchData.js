export const fetchDataThroughId = async (movieId) => {
  const response = await fetch(
    `http://imdb-api.com/en/API/Title/${process.env.REACT_APP_API_KEY}/` +
      movieId
  );
  if (response.status >= 200 && response.status <= 299) return response.json();
  else throw new Error("Failed to fetch Movie Details");
};
