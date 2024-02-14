export const API = 'https://moviesdatabase.p.rapidapi.com';
export const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '091b1d4a7dmsh200a2f3d8b3127bp130c9ajsnc0104809e6e2',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log('new feature');
