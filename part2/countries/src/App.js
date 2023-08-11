import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import ShowCountry from './components/ShowCountry';

const App = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data);
            });
    }, []);

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().match(search.toLowerCase()));

    return (
        <div>
            find countries <input value={search} onChange={handleSearch} />
            {
                countries.length === 0 ? <div>Loading...</div> :
                    <>
                        {
                            !search.match(/\S/g) ? null : (
                                countriesToShow.length === 1 ? <Country country={countriesToShow[0]} /> :
                                    countriesToShow.length > 10 ? <div>Too many matches, specify another search.</div> :
                                        countriesToShow.map(country => {
                                            return (
                                                <div key={country.name.common}>
                                                    {country.name.common} <ShowCountry country={country} />
                                                </div>
                                            )
                                        })
                            )
                        }
                    </>
            }
        </div>
    );
}

export default App;
