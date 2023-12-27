import * as React from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {debounce} from "lodash";
import "./searchBar.sass"
import {useCallback, useState} from "react";

const SearchBar = ({setFetching, setQuery}) => {

    const [value, setValue] = useState("")

    const fetchPosts = (query) => {
        setQuery(query)
        setFetching(false)
    }

    const updateQuery = useCallback(debounce(fetchPosts, 500), [])

    function handleChange (event) {
        setFetching(true)
        setValue(event.target.value)
        updateQuery(event.target.value)
    }

    return (
        <div className="search-bar" >

            <input
                type="text"
                placeholder="Поиск..."
                name="query"
                autoComplete="off"
                value={value}
                onChange={handleChange}
            />

            <AiOutlineSearch className={"search-icon"}/>

        </div>
    )
}

export default SearchBar