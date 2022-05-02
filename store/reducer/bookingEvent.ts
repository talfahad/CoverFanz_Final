import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingEventState {
  targetStarId: string;
  selectedDate: string;
}

const initialState: BookingEventState = {
  targetStarId: '',
  selectedDate: '',
};

export const bookingEventSlice = createSlice({
  name: 'BookingEvent',
  initialState,
  reducers: {
    updateTargetStarIdBE: (state, data: PayloadAction<{ star_id: string }>) => {
      state.targetStarId = data.payload.star_id;
    },

    updateBookingDateBE: (state, data: PayloadAction<{ date: string }>) => {
      state.selectedDate = data.payload.date;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTargetStarIdBE, updateBookingDateBE } =
  bookingEventSlice.actions;

export default bookingEventSlice.reducer;
