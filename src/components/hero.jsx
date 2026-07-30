import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUUpLeft } from "@phosphor-icons/react";

import SoundButton from "./SoundButton";

function Hero() {
    // GSAP timeline reference
    const timelineRef = useRef(null);

    const portfolioRef = useRef(null);
    const infoRef = useRef(null);
    const menuRef = useRef(null);
    const backRef = useRef(null);
    const soundRef = useRef(null);
    const menuButtonsRef = useRef(null);
    const aboutRef = useRef(null);
    const sectionRef = useRef(null);

    const [activeSection, setActiveSection] = useState("menu");

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

    const showMenu = () => {

        menuRef.current.style.pointerEvents = "auto";

        gsap.set(menuRef.current, {
            opacity: 1
        });

        gsap.fromTo(
            menuRef.current,
            {
                opacity: 0
            },
            {
                opacity: 1,
                pointerEvents: "auto",
                duration: .35
            }
        );

        gsap.from(menuRef.current.children,{
            delay:1.5,
            opacity:0,
            y:20,
            stagger:.12,
            duration:.5
        });

    };

    const hideMenu = () => {

        menuRef.current.style.pointerEvents = "none";

        gsap.to(menuRef.current, {

            opacity: 0,
            
            duration: .35,

            pointerEvents: "none"

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
        showMenu();
    };

    const openSection = (section) => {

        hideMenu();

        gsap.delayedCall(.3, () => {

            setActiveSection(section);

                requestAnimationFrame(() => {

                    gsap.fromTo(
                        sectionRef.current,
                        {
                            opacity:0,
                            y:30
                        },
                        {
                            opacity:1,
                            y:0,
                            duration:.6,
                            ease:"power3.out"
                        }
                    );

                });

            });

    };

    // Reverse animation
    const handleBack = () => {

        if (activeSection !== "menu") {

            gsap.to(sectionRef.current, {

                opacity: 0,
                y: 30,
                duration: .5,
                ease: "power2.out",

                onComplete: () => {

                    setActiveSection("menu");

                    requestAnimationFrame(() => {

                        gsap.set(menuRef.current, {
                            opacity: 1,
                            pointerEvents: "auto"
                        });

                        gsap.set(menuRef.current.children, {
                            opacity: 1,
                            y: 0
                        });

                    });

                }

            });

            return;
        }
        gsap.set(menuRef.current.children, {
            clearProps: "opacity,transform"
        });
        menuRef.current.style.pointerEvents = "none";

        gsap.set(menuRef.current,{
            opacity:0
        });
        timelineRef.current?.reverse();

    };

    return (

        <div className="hero">
            

            <div className="hero-content">

                <div ref={infoRef}>

                    <div className="name-wrapper">

                        <h1 className="firstname">
                            Kyriaki
                        </h1>

                        <h2 className="lastname">
                            Kalampouka
                        </h2>

                    </div>

                    <div className="job-row">

                        <div className="job-line"></div>

                        <p className="profession">
                            DATA ENGINEER
                        </p>

                    </div>

                </div>
                

                <h1
                    ref={portfolioRef}
                    className="portfolio portfolio-box"
                    onClick={handleOpen}
                >
                    ENTER PORTFOLIO ↗
                </h1>

            <div className="content-area">

                <div
                    className="menu"
                    ref={menuRef}
                >
                     
                            <button onClick={() => openSection("about")}>ABOUT ME</button>

                            <button onClick={() => openSection("skills")}>SKILLS</button>

                            <button onClick={() => openSection("experience")}>
                                WORK EXPERIENCE
                            </button>

                            <button onClick={() => openSection("projects")}>PROJECTS</button>

                            <button onClick={() => openSection("education")}>EDUCATION</button>

                            <button onClick={() => openSection("certifications")}>
                                CERTIFICATIONS
                            </button>

                            <button onClick={() => openSection("contact")}>
                                CONTACT INFO
                            </button>
                        
                            
                </div>
                <div className="section-container">
                                {activeSection==="about" && (

                                            <div
                                                ref={sectionRef}
                                                className="section-content"
                                            >
                                                <div className="section-header">

                                                    <h2>ABOUT ME</h2>

                                                    <div className="section-line"></div>

                                                </div>

                                                <div className="section-body">

                                                    <p>
                                                        Data Engineer with 4+ years of experience building scalable cloud data solutions and end-to-end ETL pipelines.
                                                    </p>

                                                    <p>
                                                        Experienced in Azure, Databricks, PySpark, and SQL, designing efficient data workflows and delivering reliable analytics solutions that transform data into actionable business insights.
                                                    </p>

                                                </div>

                                            </div>

                                    )}
                                    {activeSection === "skills" && (

                                        <div
                                            ref={sectionRef}
                                            className="section-content"
                                        >
                                            <div className="section-header">

                                                <h2>SKILLS</h2>

                                                <div className="section-line"></div>

                                            </div>

                                            <div className="skills-grid">

                                                <div className="skills-column">

                                                    <p>Databricks</p>
                                                    <p>Azure Data Factory</p>
                                                    <p>Azure Synapse</p>
                                                    

                                                </div>

                                                <div className="skills-column">

                                                    <p>SQL</p>
                                                    <p>PySpark</p>

                                                </div>

                                            </div>

                                        </div>

                                    )}
                                    {activeSection === "experience" && (

                                        <div
                                            ref={sectionRef}
                                            className="section-content"
                                        >
                                            <div className="section-header">

                                                <h2>WORK EXPERIENCE</h2>

                                                <div className="section-line"></div>

                                            </div>

                                            <div className="experience-list">

                                                <div className="experience-item">

                                                    <h3>
                                                        Data Engineering, Management & Governance Associate
                                                    </h3>

                                                    <p className="company">
                                                        Accenture Greece
                                                    </p>

                                                    <p className="date">
                                                        September 2022 – June 2024
                                                    </p>

                                                </div>

                                                <div className="experience-item">

                                                    <h3>
                                                        Data Engineering, Management & Governance Analyst
                                                    </h3>

                                                    <p className="company">
                                                        Accenture Greece
                                                    </p>

                                                    <p className="date">
                                                        June 2024 – Present
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                    {activeSection === "projects" && (

                                        <div
                                            ref={sectionRef}
                                            className="section-content"
                                        >
                                            <div className="section-header">

                                                <h2>PROJECTS</h2>

                                                <div className="section-line"></div>

                                            </div>

                                            <div className="projects-grid">

                                                <div className="project-card">

                                                    <h3>
                                                        Cloud Data Platform 
                                                    </h3>

                                                    <p className="project-date">
                                                        September 2022 – September 2025
                                                    </p>

                                                    <ul className="project-list">

                                                        <li>
                                                            Developed SQL/JSON ingestion pipelines using Hive, Spark, Oozie and HDFS.
                                                        </li>

                                                        <li>
                                                            Delivered production data from Cloudera into Azure Synapse Analytics.
                                                        </li>

                                                        <li>
                                                            Migrated legacy workflows to Azure Data Factory and Databricks.
                                                        </li>

                                                        <li>
                                                            Supported MongoDB, Oracle and SQL Server ingestion for analytics.
                                                        </li>

                                                    </ul>

                                                </div>

                                                <div className="project-card">

                                                    <h3>
                                                        Customer Analytics
                                                    </h3>

                                                    <p className="project-date">
                                                        September 2025 – Present
                                                    </p>

                                                    <ul className="project-list">

                                                        <li>
                                                            Migrated legacy SPSS workflows to Databricks.
                                                        </li>

                                                        <li>
                                                            Reverse-engineered business logic and transformations.
                                                        </li>

                                                        <li>
                                                            Developed Silver & Gold data layers with Spark SQL and PySpark.
                                                        </li>

                                                        <li>
                                                            Validated legacy outputs against the new cloud implementation.
                                                        </li>

                                                    </ul>

                                                </div>

                                            </div>

                                        </div>

                                    )}
                            </div>

            </div>
                
              
                <button
                    ref={backRef}
                    className="back-button"
                    onClick={handleBack}
                    onMouseEnter={handleBackHover}
                    onMouseLeave={handleBackLeave}
                >
                    <ArrowUUpLeft
                        size={34}
                        weight="thin"
                    />

                    <span>BACK</span>

                </button>

            </div>

            {/* <SoundButton ref={soundRef} /> */}

            
        </div>
        

    );
}

export default Hero;