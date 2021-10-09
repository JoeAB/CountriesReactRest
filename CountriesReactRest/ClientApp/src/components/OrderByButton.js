import React from 'react';

export function OrderByButton({ orderByValue, setOrderBy }) {


    return (
        <button className="btn btn-sm btn-primary" onClick={() => setOrderBy(orderByValue == "asc" ? "desc" : "asc")} >
            {orderByValue}
        </button>
    )
}

export default OrderByButton;