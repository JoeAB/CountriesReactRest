import React, { Component, useState, useEffect } from 'react';
import CountryList from "./CountryList"
import ChartView from "./ChartView"
import SortByButton from "./SortByButton"


export function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortData, setSortData] = useState("name");
    const [orderBy, setOrderBy] = useState("asc");
    const [showListView, setShowListView] = useState(false);
    const [showChartView, setShowChartView] = useState(true);



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
                    < br/>
                    <div className="row buttonRow">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <button className={`buttonRow btn btn-sm ${showChartView? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setShowChartView(!showChartView)}>Chart</button>
                        </div>
                        <div className="col-md-2">
                            <button className={`buttonRow btn btn-sm ${showListView? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setShowListView(!showListView)}>List</button>
                        </div>
                    </div>
                    <br />
                    {(showChartView || showListView) &&
                        <>
                        <div className="row buttonRow">
                            <div className="col-md-1">
                                <button className="btn btn-sm btn-primary" onClick={() => setOrderBy(orderBy == "asc" ? "desc" : "asc")} >
                                    {orderBy}
                                </button>
                            </div>
                            <div className="col-md-2">
                                <SortByButton actualSortSelection={sortData} buttonValue="name" setSortData={sort => setSortData(sort)} />
                            </div>
                            <div className="col-md-2">
                                <SortByButton actualSortSelection={sortData} buttonValue="population" setSortData={sort => setSortData(sort)} />
                            </div>
                            <div className="col-md-2">
                                <SortByButton actualSortSelection={sortData} buttonValue="size" setSortData={sort => setSortData(sort)} />
                            </div>
                        </div>
                        <br />
                        </>
                    }
                    {showChartView &&
                        <div className="row">
                            <ChartView sortData={sortedData} sortedByProp={sortData} countryCount={10} />
                        </div>
                    }
                    {showListView &&
                        <div className="row">
                            <CountryList sortData={sortedData} dataLocalAPI={dataLocalAPI} />
                        </div>
                    }
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
