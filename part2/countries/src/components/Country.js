import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {

    const { name, capital, languages, area, flags } = country;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const key = process.env.REACT_APP_API_KEY;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${name.common}&appid=${key}&units=metric`)
            .then(response => {
                setWeather(response.data);
                console.log(response.data);
            })
    }, []);

    return (
        <>
            <h2>{name.common}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Capital</td>
                        <td>{capital}</td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>{area}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Languages</h3>
            <ul>
                {Object.values(languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={flags.png} alt={flags.alt} />
            <h3>Weather for {name.common}</h3>
            {
                weather && <>
                    <div>Temperature: {weather.main.temp}°C</div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <div style={{ marginBottom: 20 }}>Wind: {weather.wind.speed} m/s</div>
                </>
            }
        </>
    )
}

export default Country;