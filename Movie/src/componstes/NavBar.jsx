import { Link } from "react-router-dom";
function Navbar() {
    return(

        <div>
            <nav>
                <Link to="/" >Home</Link>
                <Link to="/Fav" >Favorites</Link>
            </nav>

        </div>
    );
}

export default Navbar;