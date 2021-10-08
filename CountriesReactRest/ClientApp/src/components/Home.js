import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import CountryList from "./CountryList"



function sortByName(data) {
    let newArray = [...data].sort((a, b) => {
        let order = 1;
        return (
            a.name.common.toLowerCase() < b.name.common.toLowerCase()
                ? -1 * order : 1 * order
        )
    })
    return newArray;

}

function sortByPopulation(data) {
    let newArray = [...data].sort((a, b) => {
        let order = 1;
        return (
            a.population < b.population
                ? -1 * order : 1 * order
        )
    })
    return newArray;
}

export function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortedData, setSortedData] = useState(null);

    //for visited data fetch
    const [dataLocalAPI, setDataLocal] = useState(null);


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all').then((response) => response.json()).then(setData)
            .then(() => setLoading(false)).catch(setError);
    }, []);

    useEffect(() => {
        fetch('/App/GetVisitedCountries').then((response) => response.json()).then(setDataLocal);
    }, []);

    useEffect(() => {
        setSortedData(sortByName(data));
    }, [data]);

    if (data) {
        return (
            <>
                <div className="container-fluid">
                    <h1>Country List</h1>
                    <div className="row">
                        <div className="col-md2">
                            <button onClick={() => setSortedData(sortByName(data))}>Sort by Name</button>
                        </div>
                        <div className="col-md2">
                            <button onClick={() => setSortedData(sortByPopulation(data))}>Sort by Population</button>
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
