import { useAppSelector } from "../app/hooks";

function Weather() {
    const message = useAppSelector(state => state.message);
    const weather = useAppSelector(state => state.weatherInfo);

    return (
        <div className='infoWeath'>
            {}
            {!message && weather.city && (
                <>
                    <p>Location: {weather.country}, {weather.city}</p>
                    <p>Temperature: {weather.temp}°C</p>
                    <p>Pressure: {weather.pressure} hPa</p>
                    <p>Sunset: {new Date(weather.sunset * 1000).toLocaleTimeString()}</p>
                </>
            )}
            {}
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    )
}

export default Weather


