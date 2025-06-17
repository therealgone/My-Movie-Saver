function MovieCard({movie}){

 function onfavoriteClick() {
    alert("CLICKED")
 }
    return(
            <div>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}></img>
                    <div><button onClick={() => {onfavoriteClick()}}>♡</button>
                    </div>
                </div>
                <div>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                </div>
            </div>
    )
}

export default MovieCard;