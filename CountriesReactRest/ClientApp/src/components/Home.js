import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import CountryList from "./CountryList"

export function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortData, setSortData] = useState("name");
    const [orderBy, setOrderBy] = useState("asc");

    //for visited data fetch
    const [dataLocalAPI, setDataLocal] = useState(null);


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all').then((response) => response.json()).then(setData)
            .then(() => setLoading(false)).catch(setError);
    }, []);

    useEffect(() => {
        fetch('/App/GetVisitedCountries').then((response) => response.json()).then(setDataLocal);
    }, []);

    const sortedData = [...data].sort((a, b) => {
        if (sortData === "name") {
            let order = (orderBy === 'asc') ? 1 : -1;
            return (
                a.name.common.toLowerCase() < b.name.common.toLowerCase()
                    ? -1 * order : 1 * order
            )
        } else if (sortData === "population") {

            let order = (orderBy === 'asc') ? 1 : -1;
            return (
                a.population < b.population
                    ? -1 * order : 1 * order
            )
        }
    })

    if (data) {
        return (
            <>
                <div className="container-fluid">
                    <h1>Country List</h1>
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={() => setOrderBy( orderBy == "asc" ? "desc" : "asc" ) } >
                                {orderBy}
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => setSortData("name")}>Sort by Name</button>
                        </div>
                        <div className="col-md-2">
                            <button onClick={() => setSortData("population")}>Sort by Population</button>
                        </div>
                    </div>
                    <CountryList sortData={sortedData} dataLocalAPI={dataLocalAPI} />
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
