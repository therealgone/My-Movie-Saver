import { Link } from "react-router-dom";
function Navbar() {
    return(
        <div className="w-full flex items-center justify-between py-4 px-8 bg-transparent mb-8">
            <nav className="flex gap-4">
                <Link to="/" className="px-5 py-2 rounded-full bg-gray-900/80 text-white text-lg font-bold drop-shadow-glow shadow-glow hover:bg-pink-500 hover:text-white transition-all">Home</Link>
                <Link to="/Fav" className="px-5 py-2 rounded-full bg-gray-900/80 text-white text-lg font-bold drop-shadow-glow shadow-glow hover:bg-pink-500 hover:text-white transition-all">Favorites</Link>
            </nav>
            <div className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-glow select-none">React Movies</div>
        </div>
    );
}

export default Navbar;