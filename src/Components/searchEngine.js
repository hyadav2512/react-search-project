import { useRef, useState } from "react";
import useDebounceEffect from "./useDebounceEffect";
import { fetchUsers } from "./mockApi";
import { useCallback } from "react";


const SearchEngine = () =>{
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiCallCount, setApiCallCount] = useState(0);
    const resultRef = useRef("");
    const cacheRef = useRef({});

    const fetchDebouncedUsers = useCallback(async (text) => {
        const trimmedText = text.trim();
        console.log("fetchDebouncedUsers called for:", trimmedText);

        if (trimmedText === "") {
            console.log("Empty input, clearing results");
            setResults([]);
            resultRef.current = "";
            setLoading(false);
            return;
        }

        if (trimmedText in cacheRef.current) {
            console.log("Cache hit:", cacheRef.current[trimmedText]);
            setResults(cacheRef.current[trimmedText]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const res = await fetchUsers(trimmedText);
        console.log("API returned:", res);
        resultRef.current = trimmedText;
        setResults(res);
        cacheRef.current[trimmedText] = res;
        setLoading(false);
    }, []);


    useDebounceEffect(searchText, 300, fetchDebouncedUsers);

    return (
        <>
            <input type="text" placeholder="Search User"
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSearchText(e.target.value)}>
            </input>

            {!loading && searchText.trim() !== "" &&  resultRef.current === searchText.trim() && results.length === 0 &&
            <p className = "text-center text-red-500 text-sm font-medium mt-2">No results found</p>}
           { console.log("3")}

            {loading && searchText.trim() !== "" && 
            <p className = "text-center text-gray-500 text-sm font-medium mt-2">Loading...</p>}

            {!loading && results.length>0 && <p>API calls: {apiCallCount}</p>}
            <ul className="mt-4 space-y-2">
                {results.map((user) => (
                    <li key={user} className = "px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer rounded-md text-gray-700 text-base" >{user}</li>
                ))}
            </ul>

        </>
    )
}
export default SearchEngine;