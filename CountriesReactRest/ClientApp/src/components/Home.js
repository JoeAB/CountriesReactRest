import React, { Component, useState, useEffect } from 'react';
import CountryList from "./CountryList"
import ChartView from "./ChartView"


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

    const sortedData = data.sort((a, b) => {
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
        } else if (sortData === "size") {
            let order = (orderBy === 'asc') ? 1 : -1;
            return (
                a.area < b.area
                    ? -1 * order : 1 * order
            )
        }

    })

    if (data) {
        return (
            <>
                <div className="container-fluid">
                    <h1>Countries</h1>
                    <div className="row buttonRow">
                        <div className="col-md-1">
                            <button className="btn btn-lg btn-primary" onClick={() => setOrderBy( orderBy == "asc" ? "desc" : "asc" ) } >
                                {orderBy}
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className={`buttonRow btn btn-lg ${sortData === "name" ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortData("name")}>Sort by Name</button>
                        </div>
                        <div className="col-md-2">
                            <button className={`buttonRow btn btn-lg ${sortData === "population" ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortData("population")}>Sort by Population</button>
                        </div>
                        <div className="col-md-2">
                            <button className={`buttonRow btn btn-lg ${sortData === "size" ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortData("size")}>Sort by Size</button>
                        </div>
                    </div>
                    <ChartView sortData={sortedData} sortedByProp={sortData} countryCount={10 }/>
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
