import React from "react";

const Search = ({onChange}) => {    

    return (
        <>
            <div>
                <label htmlFor="search">Search:</label>
                <input type="search" id="search" onKeyPress={onChange} />
            </div>
        </>

    )
}

export default Search;