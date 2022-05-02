import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypeEnum } from '../../types/globalTypes';

export interface RegisterState {
  userType?: UserTypeEnum;
  email?: string;
  username?: string;
  password?: string;
  venmoUsername?: string;
  name?: string;
  description?: string;
  entertrainerFeatures?: string;
  mediaUrl?: string;
  location?: string;
  phoneNumber?: string;
  avatar?: string;
  performanceSummary?: string;
}

const initialState: RegisterState = {
  userType: UserTypeEnum.FAN,
  email: '',
  password: '',
  username: '',
  venmoUsername: '',
  name: '',
  description: '',
  entertrainerFeatures: '',
  mediaUrl: '',
  location: '',
  phoneNumber: '',
  avatar: '',
  performanceSummary: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateRegistrationState: (state, data: PayloadAction<RegisterState>) => {
      state.avatar = data.payload.avatar ?? state.avatar;
      state.username = data.payload.username ?? state.username;
      state.password = data.payload.password ?? state.password;
      state.venmoUsername = data.payload.venmoUsername ?? state.venmoUsername;
      state.email = data.payload.email ?? state.email;
      state.userType = data.payload.userType ?? state.userType;
      state.name = data.payload.name ?? state.name;
      state.description = data.payload.description ?? state.description;
      state.entertrainerFeatures =
        data.payload.entertrainerFeatures ?? state.entertrainerFeatures;
      state.mediaUrl = data.payload.mediaUrl ?? state.mediaUrl;
      state.location = data.payload.location ?? state.location;
      state.phoneNumber = data.payload.phoneNumber ?? state.phoneNumber;
      state.performanceSummary =
        data.payload.performanceSummary ?? state.performanceSummary;
    },

    resetRegistrationState: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateRegistrationState, resetRegistrationState } =
  registerSlice.actions;

export default registerSlice.reducer;
