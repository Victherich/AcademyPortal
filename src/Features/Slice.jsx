// src/Features/Slice.js
import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    // cart: [],
    // wishlist: [],
    managementInfo: null,
    managementToken: null,
    studentInfo:null,
    studentToken:null,
    // authorInfo: null,
    // authorToken: null,
    // affiliateInfo: null,
    // affiliateToken: null,
    // userAllOrder: [],
    // deliveryDetails: {
    //   name: "", email: "", phoneNumber: ""
    // },
    // myCourses:[]
  },
  reducers: {
    // addToCart: (state, { payload }) => {
    //   const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
    //   if (itemIndex === -1) {
    //     state.cart = [...state.cart, { ...payload }];
    //   }
    // },
    // removeFromCart: (state, { payload }) => {
    //   state.cart = state.cart.filter((e) => e.id !== payload);
    // },
    // addToWishlist: (state, { payload }) => {
    //   const itemIndex = state.wishlist.findIndex((item) => item.id === payload.id);
    //   if (itemIndex === -1) {
    //     state.wishlist = [...state.wishlist, { ...payload }];
    //   }
    // },
    // removeFromWishlist: (state, { payload }) => {
    //   state.wishlist = state.wishlist.filter((e) => e.id !== payload);
    // },
    managementLogin: (state, { payload }) => {
      state.managementInfo = payload.managementInfo;
      state.managementToken = payload.managementToken;
    },
    managementLogout: (state) => {
      state.managementInfo = null;
      state.managementToken = null;
    },
    studentLogin: (state, { payload }) => {
      state.studentInfo = payload.studentInfo;
      state.studentToken = payload.studentToken;
    },
    studentLogout: (state) => {
      state.studentInfo = null;
      state.studentToken = null;
    },
    // authorLogin: (state, { payload }) => {
    //   state.authorInfo = payload.authorInfo;
    //   state.authorToken = payload.authorToken;
    // },
    // authorLogout: (state) => {
    //   state.authorInfo = null;
    //   state.authorToken = null;
    // },
    // updateAuthorInfo: (state, { payload }) => {
    //   if (state.authorInfo) {
    //     state.authorInfo = { ...state.authorInfo, ...payload };
    //   }
    // },
    // affiliateLogin: (state, { payload }) => {
    //   state.affiliateInfo = payload.affiliateInfo;
    //   state.affiliateToken = payload.affiliateToken;
    // },
    // affiliateLogout: (state) => {
    //   state.affiliateInfo = null;
    //   state.affiliateToken = null;
    // },
    // updateAffiliateInfo: (state, { payload }) => {
    //   if (state.affiliateInfo) {
    //     state.affiliateInfo = { ...state.affiliateInfo, ...payload };
    //   }
    // },
    // handleUserAllOrder: (state, { payload }) => {
    //   state.userAllOrder = [{ ...payload }, ...state.userAllOrder];
    // },
    // setDeliveryDetails: (state, { payload }) => {
    //   state.deliveryDetails = payload;
    // },
    // addToMyCourses: (state) => {
    //   state.myCourses = [...state.myCourses, ...state.cart];
    // },
    // clearCart: (state) => {
    //   state.cart = [];
    // }
  },
});

export const {
  // addToCart,
  // removeFromCart,
  // addToWishlist,
  // removeFromWishlist,
  managementLogin,
  managementLogout,
  studentLogin,
  studentLogout
  // handleUserAllOrder,
  // setDeliveryDetails,
  // addToMyCourses,
  // clearCart,
  // authorLogin,
  // authorLogout,
  // updateAuthorInfo,
  // affiliateLogin,
  // affiliateLogout,
  // updateAffiliateInfo
} = MySlice.actions;
export default MySlice.reducer;
