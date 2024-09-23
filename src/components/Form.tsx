
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { fetchWeather } from '../features/slices/weatherSlice';

function Form() {
    const [city, setCity] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city.trim() !== '') {
            dispatch(fetchWeather(city));
            setCity('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}

export default Form;
