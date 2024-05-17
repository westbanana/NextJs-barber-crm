export const getAllEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json());
