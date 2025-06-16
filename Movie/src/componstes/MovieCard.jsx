function MovieCard({movie}){

 function onfavoriteClick() {
    alert("CLICKED")
 }
    return(
            <div>
                <div>
                    <img src={movie.url} alt={movie.title}></img>
                    <div><button onClick={() => {onfavoriteClick()}}>♡</button>
                    </div>
                </div>
                <div>
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            </div>
    )
}

export default MovieCard;