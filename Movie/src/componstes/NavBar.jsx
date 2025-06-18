import { Link } from "react-router-dom";
function Navbar() {
    return(
        <div className="w-full flex items-center justify-between py-4 px-8 mb-8">
            <nav className="flex gap-4">
                <Link to="/" className="px-6 py-2 rounded-2xl bg-zinc-800 text-white font-bold shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-105 transition-all">Home</Link>
                <Link to="/Fav" className="px-6 py-2 rounded-2xl bg-zinc-800 text-white font-bold shadow-[0_0_10px_white] hover:bg-white hover:text-black hover:scale-105 transition-all">Favorites</Link>
            </nav>
            <div className="text-3xl font-extrabold text-white drop-shadow-[0_0_10px_white] select-none">React Movies</div>
        </div>
    );
}

export default Navbar;