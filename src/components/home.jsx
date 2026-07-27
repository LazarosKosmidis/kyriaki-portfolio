import "../styles/home.css";
import Hero from "./hero";
import Sidebar from "./sidebar";
function Home() {

    return (

    <main className="home">
        <header className="topbar">

            <div className="topbar-left">

            </div>

        </header>

        <Sidebar />
        <Hero />

        <div className="bottom-line"></div>

        <p className="quote">
            BUILDING RELIABLE DATA
            <span className="quote-dot"> • </span>
            DESIGNING SCALABLE SOLUTIONS
        </p>

    </main>

);
}

export default Home;