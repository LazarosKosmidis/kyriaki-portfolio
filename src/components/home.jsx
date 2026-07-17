import "../styles/home.css";
import { useRef } from "react";
import { gsap } from "gsap";
import SoundButton from "../components/SoundButton";

function Home() {

    const portfolioRef = useRef(null);
    const infoRef = useRef(null);
    const menuRef = useRef(null);
    const soundRef = useRef(null);
    
    const handleOpen = () => {
        soundRef.current?.playAudio();
        const tl = gsap.timeline();
        
        tl.to(portfolioRef.current, {

            opacity: 0,

            duration: 0.5,

            ease: "power2.out"

        })

        .to(infoRef.current, {

            y: -150,

            duration: 1.3,

            ease: "power3.inOut"

        })

        .to(menuRef.current, {

            opacity: 1,

            duration: 0.4,

            pointerEvents: "auto"

        }, "-=0.3")

        .from(menuRef.current.children, {

            opacity: 0,

            y: 20,

            stagger: 0.1,

            duration: 0.5,

            ease: "power2.out"

        });

    };

    return (
        
        <main className="home">

            <div className="hero">

                <div ref={infoRef}>

                    <h2 className="fullname">
                        Kyriaki Kalampouka
                    </h2>

                    <p className="profession">
                        DATA ENGINEER
                    </p>

                </div>

                <h1
                    ref={portfolioRef}
                    className="portfolio portfolio-box"
                    onClick={handleOpen}
                >
                    Welcome to My Portfolio
                </h1>

                <div
                    className="menu"
                    ref={menuRef}
                >

                    <div className="divider"></div>

                    <button>ABOUT ME</button>

                    <button>SKILLS</button>

                    <button>WORK EXPERIENCE</button>

                    <button>PROJECTS</button>

                    <button>EDUCATION</button>

                    <button>CERTIFICATIONS</button>

                    <button>CONTACT INFO</button>

                </div>

            </div>

            <p className="quote">
                BUILDING RELIABLE DATA, DESIGNING SCALABLE SOLUTIONS.
            </p>
            <SoundButton ref={soundRef}/>
        </main>

    );
}

export default Home;