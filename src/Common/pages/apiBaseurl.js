import axios from 'axios';

const baseURL = 'https://usedbookr.com/demo/usedbookr/';

const apiBaseurl = axios.create({
  baseURL,
});

export const allbooks = async () => {
  try {
    const {data} = await apiBaseurl.get('/api/books');
    return data;
  } catch (error) {
    console.error('Error fetching overall books:', error);
    throw error;
  }
}

export default apiBaseurl; // Exporting the axios instance for general use
