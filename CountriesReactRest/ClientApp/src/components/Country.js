import React, { Component, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


function setZoom(area) {
    if (area < 50) {
        return 8;
    } else if (area < 6000000)
    {
        return 5;
    }
    else {
        return 3;
    }
}

export function Country() {
    let location = useLocation();
    let country = location.pathname.replace('/Country/', '')

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/alpha/'+country).then((response) => response.json()).then(setData).then(() => setLoading(false)).catch(setError);
    }, []);

    if (data) {
        const position = [data[0].latlng[0], data[0].latlng[1]]
        const zoom = setZoom(data[0].area)

        return (
            <>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <div className="row">
                                <span className="col-md-12">
                                    <h1>{data[0].name.common}</h1>
                                </span>
                            </div>
                            <div className="row">
                                <span className="col-md-12"><img className="Flag" src={'' + data[0].flags.png} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <div className="row">
                                <span className="col-md-4 Label">
                                    Official Name
                                </span>
                                <span className="col-md-8">
                                    {data[0].name.official}
                                </span>
                            </div>
                            <div className="row">
                                <span className="col-md-4 Label">
                                    Population
                                </span>
                                <span className="col-md-8">
                                    {data[0].population.toLocaleString()}
                                </span>
                            </div>
                            <div className="row">
                                <span className="col-md-4 Label">
                                    Size
                                </span>
                                <span className="col-md-8">
                                    {data[0].area.toLocaleString()} Square Kilometers
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                </div>
                <div className="row">
                    <span className="col-md-12">
                        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </span>
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

    return <h1>{country}</h1>
}
