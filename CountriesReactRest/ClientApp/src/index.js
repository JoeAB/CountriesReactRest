import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect, useReducer} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


//https://restcountries.com/v3.1/all

function Test1() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all').then((response) => response.json()).then(setData);
    }, []);

    if (data) {
        return (
            <ul>
                {data.map((item) =>
                (<li>
                    {item.name.common}
                </li>)
                )}
            </ul>
        )
    }
    return <h1>Test nothing</h1>
}



ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>,
  rootElement);


