import { createSlice } from "@reduxjs/toolkit";


export const CrateSlice = createSlice({
    name: "usedbookr_product",
    initialState: {
        isClass1Show: true,
        profileDetails: '',
        loginDetails: {
            email: '',
            password: ''
        },
        userLogin : false,
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
        userProfileImage:{
            'userfile':''
        },
        otpNumber : {
            email:'',
            otp:'' 
        },
        registerToken : {
            username : '',
            email :'',
            name : '',
            phonenumber : '',
            profile : '',
            address:'',
            state:'',
            city:'',
            pincode:''
        },
        updateAddress : {
            name : '',
            phone : '',
            address:'',
            state:'',
            city:'',
            pincode:''
        },
        megaMenu:{},
        bannerImage : [],
        allbookDetails: "",
        authorBookDetails : "",
        authorsDetails : "",
        authorsName : '',
        categoryBook : [],
        subCategoryBook:'',
        singleProductPrice : [],
        clickauthorName : '',
        filterCategory:[],
        navListDetails:'',
        searchProduct:{
            searchItem:''
        },
        singleProductView:[],
        searchItemDetails:[],
        searchfield:true,
        filterBookCategory : [],
        filteredProducts: [],
        likedProducts: [],
        totalLikes : [],
        shopProducts: [],
        userIdShop : [],
        userIdLike:[],
        bookQuantity : [],
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
        orderDetails: {
            name: "",
            email: "",
            mobile_no: "",
            state:"",
            city:"",
            pincode:"",
            address:"",
            paymentmode:""
        },
        historyDetails : [],
        reviewDetails : {
            book_id : '',
            rating:'',
            review:''
        },
        singleBookHistory :[],
        isInvoiceDetails : {}
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
        setUserLogin: (state, action) => {
            state.userLogin = action.payload
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
        setMegaMenu: (state, action) => {
            state.megaMenu = action.payload
        },
        setregisterDetails: (state, action) => {
            state.registerDetails = action.payload
        },
        setProfileUpload: (state, action) => {
            state.userProfileImage = action.payload
        },
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload
        },
        setOtpVerify: (state, action) => {
            state.otpNumber = action.payload
        },
        setRegisterToken: (state, action) => {
            state.registerToken = action.payload
        },
        setUpdateAddress: (state, action) => {
            state.updateAddress = action.payload
        },
        
        setnavListDetails: (state, action) => {
            state.navListDetails = action.payload
        },
        setFilterCategory: (state, action) => {
            state.filterCategory = action.payload
        },
        
        setBannerImage: (state, action) => {
            state.bannerImage = action.payload
        },
        setSingleProductPrice: (state, action) => {
            state.singleProductPrice = action.payload
        },
        setallBookDetails: (state, action) => {
            state.allbookDetails = action.payload
        },
        setCategoryBook: (state, action) => {
            state.categoryBook = action.payload
        },
        setSubCategoryBook: (state, action) => {
            state.subCategoryBook = action.payload
        },
        setAuthorBookDetails: (state, action) => {
            state.authorBookDetails = action.payload
        },
        setAuthorsDetails: (state, action) => {
            state.authorsDetails = action.payload
        },
        setAuthorsName: (state, action) => {
            state.authorsName = action.payload
        },
        setClickauthorName: (state, action) => {
            state.clickauthorName = action.payload
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
        setFilterBookCategory: (state, action) => {
            state.filterBookCategory = action.payload
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
        setBookQuantity: (state, action) => {
            state.bookQuantity = action.payload
        },
        setUserIdShop: (state, action) => {
            state.userIdShop = action.payload
        },
        setUserIdLike: (state, action) => {
            state.userIdLike = action.payload
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
        setHistoryDetails: (state, action) => {
            state.historyDetails = action.payload
        },
        setSingleBookHistory: (state, action) => {
            state.singleBookHistory = action.payload
        },
        setIsInvoiceDetails: (state, action) => {
            state.isInvoiceDetails = action.payload
        },
        setReviewDetails: (state, action) => {
            state.reviewDetails = action.payload
        },
        
        

    }
})

export const { setClass1Hide, setprofileDetails,setProfileUpload, setloginDetails,setUserIdShop,setUserIdLike,setUserLogin,setsingleProductView,setOtpVerify,setRegisterToken,setUpdateAddress,setforgetDetails,setMegaMenu,setOrderDetails,setresetpasswordDetails, setlogoutDetails,setnavListDetails,setBannerImage,setFilterCategory,setClickauthorName,setAuthorBookDetails,setSingleProductPrice,setBookQuantity,setregisterDetails,setsearchProduct,setsearchItemDetails,setCategoryBook,setSubCategoryBook,setsearchfield,setFilterBookCategory,setFilteredProducts, setisLiked, setisAdded, setisIncrement, setisDecrement, setActiveItem, setallBookDetails,setAuthorsDetails,setAuthorsName, setLikedProducts,settotallikes ,setlikescount, setShopProducts, setshopcount, settotalItemShop, setfinalItemPrice,setpriceFilter,setminPirce,setproductIdDetails,setsingleItemCount,setsingleItemPrice,setHistoryDetails,setSingleBookHistory,setIsInvoiceDetails,setReviewDetails } = CrateSlice.actions
export default CrateSlice.reducer

