import "../styles/home.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { ArrowUUpLeft } from "@phosphor-icons/react";

import SoundButton from "../components/SoundButton";

function Home() {

    // References to HTML components to animate with GSAP
    const portfolioRef = useRef(null);
    const infoRef = useRef(null);
    const menuRef = useRef(null);
    const backRef = useRef(null);
    const soundRef = useRef(null);

    // GSAP timeline reference
    const timelineRef = useRef(null);

    // Back button hover animation
    const handleBackHover = () => {

        gsap.to(backRef.current, {

            y: -10,

            duration: 0.15,

            ease: "power2.out"

        });

    };

    const handleBackLeave = () => {

        gsap.to(backRef.current, {

            y: 0,

            duration: 0.15,

            ease: "power2.out"

        });

    };

    // Open menu
    const handleOpen = () => {

        // Start music
        soundRef.current?.playAudio();

        if (!timelineRef.current) {

            timelineRef.current = gsap.timeline({ paused: true });

            timelineRef.current

                // Hide Welcome button
                .to(portfolioRef.current, {

                    opacity: 0,

                    duration: 0.5,

                    ease: "power2.out"

                })

                // Move name upwards
                .to(infoRef.current, {

                    y: -160,

                    duration: 1.4,

                    ease: "power3.inOut"

                })

                

                // Show menu
                .to(menuRef.current, {

                    opacity: 1,

                    duration: 0.4,

                    onStart: () => {

                        menuRef.current.style.pointerEvents = "auto";

                    },

                    onReverseComplete: () => {

                        menuRef.current.style.pointerEvents = "none";

                    }

                }, "<")

                // Animate menu items one by one
                .from(menuRef.current.children, {

                    opacity: 0,

                    y: 20,

                    stagger: 0.1,

                    duration: 0.5,

                    ease: "power2.out"

                })
                // Show Back button
                .to(backRef.current, {

                    opacity: 1,

                    duration: 0.4,

                    onStart: () => {

                        backRef.current.style.pointerEvents = "auto";

                    },

                    onReverseComplete: () => {

                        backRef.current.style.pointerEvents = "none";

                    }

                }, "-=0.3");

                

        }

        timelineRef.current.play();

    };

    // Reverse animation
    const handleBack = () => {

        timelineRef.current?.reverse();

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

                <button
                    ref={backRef}
                    className="back-button"
                    onClick={handleBack}
                    onMouseEnter={handleBackHover}
                    onMouseLeave={handleBackLeave}
                >
                    <ArrowUUpLeft
                        size={42}
                        weight="thin"
                    />

                    <span>BACK</span>

                </button>

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

            {/* <SoundButton ref={soundRef} /> */}

        </main>

    );
}

export default Home;