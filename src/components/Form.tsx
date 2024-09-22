import { FormEvent, useState } from 'react';
import { base_url, api_key } from '../utils/constant';
import { useAppDispatch } from '../app/hooks';
import { putWeatherInfo } from '../features/slices/weatherSlice';
import { putMessage } from '../features/slices/messageSlice';

function Form() {
    const [city, setCity] = useState('');
    const dispatch = useAppDispatch()

    const fetchWeather = async (cityName: string) => {
        try {
            const response = await fetch(`${base_url}?q=${cityName}&appid=${api_key}&units=metric`);
            if (!response.ok) {
                const data = await response.json();
                dispatch(putMessage(data.message || 'Failed to fetch weather'));
                return;
            }
            const data = await response.json();
            const info = {
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                pressure: data.main.pressure,
                sunset: data.sys.sunset
            };
            dispatch(putWeatherInfo(info));
            dispatch(putMessage('')); 
        } catch (error) {
            dispatch(putMessage('Enter correct city name'));
        }
    }

    const getCity = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city.trim() !== '') {
            fetchWeather(city);
            setCity('');
        }
    }

    return (
        <form onSubmit={getCity}>
            <input 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                type='text' 
                name='city' 
                placeholder='Enter city name'
                required
            />
            <button type='submit'>Get Weather</button>
        </form>
    )
}

export default Form
