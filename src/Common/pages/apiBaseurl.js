import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

const baseURL = 'https://usedbookr.com/demo/usedbookr/';

const apiBaseurl = axios.create({
  baseURL,
});

// allbooks api 
// export const allbooks = async () => {
//   try {
//     const { data } = await apiBaseurl.get('/books/api/all');
//     const allBook = data.response.books;
//     const productsWithIds = allBook.map((product, index) => ({
//       id: index + 1,
//       ...product
//     }));
//     return allBook;
//   } catch (error) {
//     console.error('Error fetching overall books:', error);
//     throw error;
//   }
// }


export const allbooks = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/books/all');
    const allBook = data.books;
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
    return data;

  } catch (error) {
    console.log(error.response.data.errors.email[0]);
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


// banner section image api 
export const banner = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/banners/all')
    const banner_image = data.banners
    return banner_image
  } catch (error) {
    console.log(error)
  }
}

//category list api start
export const category_list = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/categories/all')
    const category_type = data.categories
    return category_type;
  } catch (error) {
    console.log(error)
  }
}



// megamenu api start 
export const megamenu_list = async () => {
  try {
    const { data } = await apiBaseurl.get('/api/categoryandsubcategory/all')
    const menu_category = data.categories
    return menu_category;
  } catch (error) {
    console.log(error)
  }
}




//wishlists api start
export const wish_list = async () => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.get('api/wishlists', {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });

    return data;

  } catch (error) {
    console.log(error)
  }
}

// addtocard list api start 
export const addTocard_list = async (isBookId, updatedQty) => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.post('api/addtocart', {
      book_id: isBookId.id,
      quantity: updatedQty,
    }, {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });
    return data;
  } catch (error) {
    console.log(error)
  }
}

//remove card api start
export const removeTocard_list = async (id) => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.get(`api/cartremove/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });
    console.log("data", data)
    return data;
  } catch (error) {
    console.log(error)
  }
}


// addcard list get in user api start 
export const cardToget_list = async () => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.get('api/carts', {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });
    return data.carts;
  } catch (error) {
    console.log(error)
  }
}


// addtolike list api start 
export const addTowhish_list = async (isBookId) => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.post('api/wishliststore', {
      book_id: isBookId.id,
    }, {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });
    return data;
  } catch (error) {
    console.log(error)
  }
}

// addcard list get in user api start 
export const cardTolike_list = async () => {
  try {
    const tokenId_get = localStorage.getItem('usedbookrtoken');
    const { data } = await apiBaseurl.get('api/wishlists', {
      headers: {
        Authorization: `Bearer ${tokenId_get}`,
        'Accept': 'application/json',
      }
    });
    return data.wishlists;
  } catch (error) {
    console.log(error)
  }
}

export default apiBaseurl; // Exporting the axios instance for general use
