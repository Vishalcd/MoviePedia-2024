export const API = 'https://moviesdatabase.p.rapidapi.com';
export const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'API_KEY',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
