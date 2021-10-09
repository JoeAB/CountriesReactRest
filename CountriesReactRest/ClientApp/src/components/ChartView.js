import { data } from 'jquery';
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip } from 'recharts';


export function ChartView({ sortData, sortedByProp, countryCount}) {

    const data = convertData(sortData, sortedByProp, countryCount)

    return (
        <div>
            <BarChart width={1200} height={450} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" interval={0} height={200}/>
                <YAxis dataKey={sortedByProp} width={200}/>
                <Tooltip />
                <Legend />
                <Bar dataKey={sortedByProp} fill="#82ca9d" />
            </BarChart>
        </div>
    )
}

function convertData(data, sortedByProp, countryCount) {
    let arr = [];
    if (data.length > 0) {
        for (let i = 0; i < countryCount; i++) {
            if (sortedByProp === "population") {
                let obj = { name: data[i].name.common, population: data[i].population };
                arr.push(obj);
            } else if (sortedByProp === "size") {
                let obj = { name: data[i].name.common, size: data[i].area };
                arr.push(obj);
            } else {
                let obj = { name: data[i].name.common, population: data[i].population };
                arr.push(obj);
            }
        }
    }

    return arr;
}


export default ChartView;