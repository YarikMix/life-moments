import {useEffect, useState} from "react";

export const useDynamicPagination = (triggers, fetchData) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (fetching && !isLastPage) {
            const pageSize = 3

            fetchData(page, pageSize).then(resp => {
                setData([...data, ...resp["data"]])
                setPage(prevPage => prevPage + 1)
                setIsLastPage(resp["isLastPage"])
            }).finally(() => setFetching(false))
            
        }
    }, [fetching])

    useEffect(() => {
        setData([])
        setPage(0)
        setFetching(!fetching)
        setIsLastPage(false)
    }, [...triggers])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
            if (!isLastPage) {
                setFetching(true)
            }
        }
    }

    return {
        data,
        setData
    }
}