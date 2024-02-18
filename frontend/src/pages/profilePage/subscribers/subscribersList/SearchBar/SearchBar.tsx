import {FaSearch} from "react-icons/fa";
import "./SearchBar.sass"

const SearchBar = () => {
    return (
        <form className="search-bar" >

            <input
                type="text"
                placeholder="Поиск..."
                name="query"
                autoComplete="off"
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    );
}

export default SearchBar;