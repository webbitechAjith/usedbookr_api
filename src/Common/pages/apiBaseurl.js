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
    const allBook = data.response.books;
    const productsWithIds = allBook.map((product, index) => ({
      id: index + 1,
      ...product
    }));
    return productsWithIds;
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
    return data;

  } catch (error) {
    alert(error.response.data.errors.email[0]);
  }
}

//otp api verify

export const otpVerify = async (otpNumber) => {
  try {
    const { data } = await apiBaseurl.post('/api/verify-otp', otpNumber, {
      headers: {
        'Accept': 'application/json',
      }
    });
    return data
  } catch (error) {
    alert(error)
  }
}

//otp token api verify

export const otpToken = async (registerToken) => {
  try {
    const { data } = await apiBaseurl.get('/api/user', {
      headers: {
        Authorization: `Bearer ${registerToken}`,
        'Accept': 'application/json',
      }
    });
    return data
  } catch (error) {
    console.log("error")
  }
}



//login api 
export const authLogin = async (loginDetails) => {
  try {
    const { data } = await apiBaseurl.post('/api/login', loginDetails, {
      headers: {
        'Accept': 'application/json',
      }
    }
    );
    return data
  } catch (error) {
    alert("email or password incorrect")
  }
}


// author name api 
export const authUser = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/authors', {
      headers: {
        'Accept': 'application/json',
      }
    }
    )
    const final_allAuthor = data.authors
    return final_allAuthor
  } catch (error) {
    console.log("error")
  }
}

export default apiBaseurl; // Exporting the axios instance for general use
