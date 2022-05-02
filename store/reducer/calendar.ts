import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalenderState {
  events: string[];
}

const initialState: CalenderState = {
  events: [],
};

export const calenderSlice = createSlice({
  name: 'calender',
  initialState,
  reducers: {
    doSomething: (state) => {
      state.events = [...state.events, '28'];
    },
  },
});

// Action creators are generated for each case reducer function
export const { doSomething } = calenderSlice.actions;

export default calenderSlice.reducer;
