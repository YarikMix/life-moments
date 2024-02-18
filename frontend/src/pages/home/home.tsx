import "./home.sass"
import PostsList from "../../components/postsList/postsList";
import RightBar from "./rightBar/rightBar";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import SearchBar from "../../components/postsList/searchBar/searchBar";
import Loader from "../../components/Loader/Loader";

const Home = () => {

	const {is_authenticated, user} = useAuth()

	useEffect(() => {
		document.title = 'Лента моментов'
	}, [])

	const [query, setQuery] = useState("")

	const [fetching, setFetching] = useState(false)


	return (
		<div className="home-page-wrapper">
			<div className="left-container">
				<SearchBar setFetching={setFetching} setQuery={setQuery} />
				{fetching && <Loader /> }
				{!fetching && <PostsList owner={user} showPostForm={false} query={query} fetching={fetching} setFetching={setFetching}/> }
			</div>
			{is_authenticated && <RightBar/> }
		</div>
	)
}

export default Home;