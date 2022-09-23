import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({
  searchParam: "",
  handleOnChange: () => {},
  handleOnSubmit: () => {},
  movieList: [],
  loading: false,
});

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [movieList, setMovieList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const getDataFromStorage=JSON.parse(localStorage.getItem('movieList'));
    if (getDataFromStorage && getDataFromStorage.length>0) setMovieList(getDataFromStorage)
  })
  const handleOnChange = (event) => {
    setSearchParam(event.target.value);
  };
  const handleOnSubmit = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=13f31283&s=${searchParam}`
    );
    const data = await response.json();
    setLoading(true);
    if (data) {
      setMovieList(data.Search);
      localStorage.setItem('movieList',JSON.stringify(data.Search))
      setSearchParam("");
      setLoading(false);
    }
  };
  const contextValue = {
    searchParam,
    handleOnChange,
    handleOnSubmit,
    movieList,
    loading,
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
