import React  from 'react';

export function SortByButton({ actualSortSelection, buttonValue, setSortData }) {


    return (
        <button className={`buttonRow btn btn-sm ${actualSortSelection === buttonValue? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSortData(buttonValue)}>Sort by {buttonValue}</button>
    )
}

export default SortByButton;