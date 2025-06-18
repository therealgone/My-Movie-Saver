import { createContext, useState, useContext,useEffect, use } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children})=>{

    const [Favorite,setFavorite] = useState([]);

    useEffect(()=>{

        const storedFav = localStorage.getItem("favorites");

        if (storedFav) {
            setFavorite(JSON.parse(storedFav));
        }
    },[])


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(Favorite));
    }, [Favorite]);

    const addToFavorite = (movie) => {
        setFavorite(prevFav => [...prevFav, movie]);
    }

    const removeFromFavorite = (movieId) => {
        setFavorite(prevFav => prevFav.filter(movie => movie.id !== movieId));
    }
    const isFavorite = (movieId) => {
        return Favorite.some(movie => movie.id === movieId);
    }
    return <MovieContext.Provider value={{
        Favorite,
        addToFavorite,
        removeFromFavorite,
        isFavorite
    }}>
        {children}
    </MovieContext.Provider>
}