import { createSlice } from "@reduxjs/toolkit";
import { WeatherInfo } from "../../utils/types";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {} as WeatherInfo,
    reducers: {
        putWeatherInfo: (_state, action) => action.payload
    }
})

export const { putWeatherInfo } = weatherSlice.actions
export default weatherSlice.reducer