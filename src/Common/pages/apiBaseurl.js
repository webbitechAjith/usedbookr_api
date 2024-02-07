import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

const baseURL = 'https://usedbookr.com/demo/usedbookr/';

const apiBaseurl = axios.create({
  baseURL,
});

// allbooks api 
export const allbooks = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/books');
    const allBook = data.response.books
    return allBook;
  } catch (error) {
    console.error('Error fetching overall books:', error);
    throw error;
  }
}

// register api call 

export const userRegister = async (registerDetails) => {
  try {
    const { data } = await apiBaseurl.post('/api/send-otp', registerDetails, {
      headers: {
        'Accept': 'application/json',
      }
    });
    if (data.success == true) {
      alert(data.message);
    } 
  } catch (error) {
     alert(error.response.data.errors.email[0]);
    // throw error;
  }
}

export default apiBaseurl; // Exporting the axios instance for general use
