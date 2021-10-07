import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'



export function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //for visited data fetch
    const [dataLocalAPI, setDataLocal] = useState(null);


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all').then((response) => response.json()).then(setData).then(() => setLoading(false)).catch(setError);
    }, []);

    useEffect(() => {
        fetch('/App/GetVisitedCountries').then((response) => response.json()).then(setDataLocal);
    }, []);

    if (data && dataLocalAPI) {
        return (
            <>
                <h1>Country List</h1>
                <div className="container-fluid">
                    {data.map((item) =>
                    (<div className="row">
                        <div className="col-md-12">
                            <Link to={'/Country/' + item.name.common} >
                                {item.name.common}
                            </Link>
                            {dataLocalAPI.Countries.some(val => val === item.name.common) && <span className="Bolded"> *</span> }
                        </div>
                    </div>)
                    )}
                </div>
            </>
        )
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>There was an error accessing the contents of the site or the Apocolypse is upon us and every nation on the Earth has ceased to be.</p>
    }

    //I don't think we should ever hit this point, but just in case...
    return <h1>Why are we here, just to suffer?</h1>
}
