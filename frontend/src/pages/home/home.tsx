import "./home.sass"
import PostsList from "../../components/postsList/postsList";
import RightBar from "./rightBar/rightBar";
import {useAuth} from "../../hooks/users/useAuth";
import {useState} from "react";
import SearchBar from "../../components/postsList/searchBar/searchBar";
import Loader from "../../components/Loader/Loader";
import {Helmet} from "react-helmet";

const Home = () => {

	const {is_authenticated, user} = useAuth()

	const [query, setQuery] = useState("")

	const [fetching, setFetching] = useState(false)

	return (
        <>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <div className="home-page-wrapper">
                <div className="left-container">
                    <SearchBar setFetching={setFetching} setQuery={setQuery}/>
                    {fetching && <Loader/>}
                    {!fetching && <PostsList owner={user} showPostForm={false} query={query} fetching={fetching} setFetching={setFetching} />}
                </div>
                {is_authenticated && <RightBar/>}
            </div>
        </>
    )
}

export default Home;