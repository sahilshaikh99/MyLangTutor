import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: stateType = {
    loading: false,
    words: [],
    result: [],

}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        getWordsRequest: (state) => {
            state.loading = true;
        },
        getWordsSuccess: (state, action: PayloadAction<WordType[]>) => {
            state.loading = false;
            state.words = action.payload;
        },
        getWordsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getResult: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.result = action.payload;
        },
        clearState: (state) => {
            state.loading = false;
            state.error = undefined;
            state.result = [];
            state.words = [];
        }
    }
})

export const { getWordsRequest, getWordsSuccess, getWordsError, getResult, clearState } = rootSlice.actions;

export default rootSlice.reducer;