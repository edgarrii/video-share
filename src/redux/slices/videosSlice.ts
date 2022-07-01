import { IVideo } from "../../interfaces/IVideo";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: IVideo[] = [];

const videosSlice = createSlice({
  name: "videosSlice",
  initialState,
  reducers: {
    setNfts: (state, { payload }) => payload,
  },
});

export const { setNfts } = videosSlice.actions;

export default videosSlice.reducer;

// Selectors
export const categoriesSelector = createSelector(
  (state: RootState) => state,
  (state) => state
);
