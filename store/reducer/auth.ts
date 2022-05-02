import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypeEnum } from '../../types/globalTypes';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    userType: string;
    username: string;
    venmoUsername: string;
    identifier: string;
    description: string;
    active: boolean;
    premium: boolean;
    entertrainerFeatures?: string;
    mediaUrl?: string;
    location?: string;
    phoneNumber?: string;
    ratingByStar?: number;
    ratingByVenue?: number;
    ratingByFan?: number;
    booking?: any;
    review?: any;
    promotion?: any;
    accountStatus?: string;
    performanceSummary?: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    email: '',
    username: '',
    venmoUsername: '',
    name: '',
    description: '',
    entertrainerFeatures: '',
    mediaUrl: '',
    location: '',
    performanceSummary: '',
    phoneNumber: '',
    avatar: '',
    _id: '',
    active: false,
    userType: 'star',
    identifier: '455',
    premium: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, data: PayloadAction<AuthState>) => {
      state.isAuthenticated = data.payload.isAuthenticated;
      state.user = data.payload.user;
    },

    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, resetAuth } = authSlice.actions;

export default authSlice.reducer;
