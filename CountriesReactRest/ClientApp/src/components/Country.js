import React, { Component, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'



export function Country() {
    let location = useLocation();
    let country = location.pathname.replace('/Country/', '')

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/name/'+country).then((response) => response.json()).then(setData).then(() => setLoading(false)).catch(setError);
    }, []);

    if (data) {
        return (
            <>
                <h1>{data[0].name.common}</h1>
                <img src={''+data[0].flags.png} />
            </>
        )
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>There was an error accessing the contents of the site or the Apocolypse is upon us and every nation on the Earth has ceased to be.</p>
    }

    return <h1>{country}</h1>
}
