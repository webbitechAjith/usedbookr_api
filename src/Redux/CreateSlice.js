import { createSlice } from "@reduxjs/toolkit";


export const CrateSlice = createSlice({
    name: "usedbookr_product",
    initialState: {
        isClass1Show: false,
        profileDetails: '',
        loginDetails: {
            email: '',
            password: ''
        },
        logoutDetails: false,
        forgetDetails: {
            email: ''
        },
        resetpasswordDetails: {
            email: '',
            token:'',
            password:''
        },
        registerDetails: {
            name: "",
            email: "",
            phone_number: "",
            password: "",
            password_confirmation: ""
        },
        otpNumber : {
            email:'',
            otp:'' 
        },
        registerToken : {
            username : '',
            email :'',
            name : '',
            phonenumber : ''
        },
        allbookDetails: "",
        authorsDetails : "",
        authorsName : '',
        navListDetails:'',
        searchProduct:{
            searchItem:''
        },
        singleProductView:[],
        searchItemDetails:[],
        searchfield:true,
        filteredProducts: [],
        likedProducts: [],
        totalLikes : [],
        shopProducts: [],
        likescount: 0,
        shopcount: 0,
        isLiked: false,
        isAdded: false,
        activeItem: 'Account',
        totalItemShop: 0,
        finalItemPrice: '',
        minPrice:0,
        priceFilter: [],
        productIdDetails:"",
        singleItemCount:0,
        singleItemPrice:0,
    },

    reducers: {
        setClass1Hide: (state, action) => {
            state.isClass1Show = action.payload
        },
        setprofileDetails: (state, action) => {
            state.profileDetails = action.payload
        },
        setloginDetails: (state, action) => {
            state.loginDetails = action.payload
        },
        setlogoutDetails: (state, action) => {
            state.logoutDetails = action.payload
        },
        setforgetDetails: (state, action) => {
            state.forgetDetails = action.payload
        },
        setresetpasswordDetails: (state, action) => {
            state.resetpasswordDetails = action.payload
        },
        setregisterDetails: (state, action) => {
            state.registerDetails = action.payload
        },
        setOtpVerify: (state, action) => {
            state.otpNumber = action.payload
        },
        setRegisterToken: (state, action) => {
            state.registerToken = action.payload
        },
        setnavListDetails: (state, action) => {
            state.navListDetails = action.payload
        },
        setallBookDetails: (state, action) => {
            state.allbookDetails = action.payload
        },
        setAuthorsDetails: (state, action) => {
            state.authorsDetails = action.payload
        },
        setAuthorsName: (state, action) => {
            state.authorsName = action.payload
        },
        setsingleProductView: (state, action) => {
            state.singleProductView = action.payload
        },
        setsearchProduct: (state, action) => {
            state.searchProduct = action.payload
        },
        setsearchItemDetails: (state, action) => {
            state.searchItemDetails = action.payload
        },
        setsearchfield: (state, action) => {
            state.searchfield = action.payload
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload
        },
        setisLiked: (state, action) => {
            state.isLiked = action.payload
        },
        setisAdded: (state, action) => {
            state.isAdded = action.payload
        },
        setisIncrement: (state) => {
            state.isAddproductcount += 1
        },
        setisDecrement: (state) => {
            state.isAddproductcount -= 1
        },
        setActiveItem: (state, action) => {
            state.activeItem = action.payload
        },
        setLikedProducts: (state, action) => {
            state.likedProducts = action.payload
        },
        settotallikes: (state, action) => {
            state.totalLikes = action.payload
        },
        
        setlikescount: (state, action) => {
            state.likescount = action.payload
        },
        setShopProducts: (state, action) => {
            state.shopProducts = action.payload
        },
        setshopcount: (state, action) => {
            state.shopcount = action.payload
        },
        settotalItemShop: (state, action) => {
            state.totalItemShop = action.payload
        },
        setfinalItemPrice: (state, action) => {
            state.finalItemPrice = action.payload
        },
        setminPirce: (state, action) => {
            state.minPirce = action.payload
        },
        setpriceFilter: (state, action) => {
            state.priceFilter = action.payload
        },
        setproductIdDetails: (state, action) => {
            state.productIdDetails = action.payload
        },
        setsingleItemCount: (state, action) => {
            state.singleItemCount = action.payload
        },
        setsingleItemPrice: (state, action) => {
            state.singleItemPrice = action.payload
        },

    }
})

export const { setClass1Hide, setprofileDetails, setloginDetails,setsingleProductView,setOtpVerify,setRegisterToken,setforgetDetails,setresetpasswordDetails, setlogoutDetails,setnavListDetails, setregisterDetails,setsearchProduct,setsearchItemDetails,setsearchfield,setFilteredProducts, setisLiked, setisAdded, setisIncrement, setisDecrement, setActiveItem, setallBookDetails,setAuthorsDetails,setAuthorsName, setLikedProducts,settotallikes ,setlikescount, setShopProducts, setshopcount, settotalItemShop, setfinalItemPrice,setpriceFilter,setminPirce,setproductIdDetails,setsingleItemCount,setsingleItemPrice } = CrateSlice.actions
export default CrateSlice.reducer

