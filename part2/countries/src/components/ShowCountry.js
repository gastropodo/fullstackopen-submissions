import { useState } from 'react';
import Country from "./Country";

const ShowCountry = ({ country }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
            {
                show && <Country country={country} />
            }
        </>
    )
}

export default ShowCountry;