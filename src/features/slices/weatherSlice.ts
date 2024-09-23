
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WeatherInfo } from "../../utils/types";
import { base_url, api_key } from "../../utils/constant";

interface WeatherState extends WeatherInfo {
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: '',
  country: '',
  temp: 0,
  pressure: 0,
  sunset: 0,
  loading: false,
  error: null,
};

// action fetchWeather
export const fetchWeather = createAsyncThunk<
  WeatherInfo,         
  string,             
  { rejectValue: string } 
>(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}?q=${city}&appid=${api_key}&units=metric`);
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'Не удалось получить погоду');
      }
      const data = await response.json();
      return {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        pressure: data.main.pressure,
        sunset: data.sys.sunset,
      } as WeatherInfo;
    } catch (error) {
      return rejectWithValue('Сетевая ошибка');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    putWeatherInfo: (state, action: PayloadAction<WeatherInfo>) => {
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.temp = action.payload.temp;
      state.pressure = action.payload.pressure;
      state.sunset = action.payload.sunset;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherInfo>) => {
        state.loading = false;
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.temp = action.payload.temp;
        state.pressure = action.payload.pressure;
        state.sunset = action.payload.sunset;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не удалось получить погоду';
      });
  },
});

export const { putWeatherInfo } = weatherSlice.actions;
export default weatherSlice.reducer;
