
import { useAppSelector } from "../app/hooks";

function Weather() {
    const { city, country, temp, pressure, sunset, loading, error } = useAppSelector(state => state.weatherInfo);

    return (
        <div className='infoWeath'>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && city && (
                <>
                    <p>Location: {country}, {city}</p>
                    <p>Temperature: {temp}°C</p>
                    <p>Pressure: {pressure} hPa</p>
                    <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
                </>
            )}
        </div>
    );
}

export default Weather;
