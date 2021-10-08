import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export function CountryList({ sortData, dataLocalAPI}) {


    return(
        <div>
            {sortData && sortData.map((item) =>
                (<div className="row">
                    <div className="col-md-12">
                        <Link to={'/Country/' + item.name.common} >
                            {item.name.common}
                        </Link>
                        {dataLocalAPI.Countries.some(val => val === item.name.common) && <span className="Bolded"> *</span>}
                    </div>
                </div>)
                )
            }
        </div>
    )
}

export default CountryList;