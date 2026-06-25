import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Atom FinAI",
    category: "AI-Powered Personal Financial Coach",
    tools: "React, TypeScript, Tailwind CSS, Firebase, Gemini API, Firestore",
    image: "/images/atom_finai.png",
    link: "https://atomfinai.web.app",
    github: "https://github.com/nid67/atom-finai",
    description: "A premium AI-driven personal finance platform featuring smart receipt scanning, budget planning, subscription detection, and an interactive AI financial coach powered by Gemini. Features a clean fintech UI and Firestore architecture.",
  },
  {
    title: "Sainya Trust",
    category: "NGO & Charitable Organisation Website",
    tools: "React, TypeScript, Firebase, Tailwind CSS, Vite",
    link: "https://sainya-trust.web.app/",
    github: "https://github.com/nid67/Sainya-Trust",
    description: "A full-fledged website for Sainya Trust Kovilpatti, a registered charitable organisation in Tamil Nadu dedicated to supporting underprivileged communities, Indian military veterans, and martyrs' families. Features donation management, event listings, and an impactful public-facing UI.",
  },
  {
    title: "EcoSentra (SIH 2025)",
    category: "Civic Issue Reporting System",
    tools: "Flutter, Firebase, Web, Crowdsourcing",
    image: "/images/ecosentra.png",
    link: "https://ecosentra.onrender.com/",
    github: "https://github.com/nid67/Ecosentra-Connect",
    description: "A crowdsourced civic issue reporting system that lets citizens report local problems with ease. Built with Firebase and Flutter, it enables real-time complaint tracking and admin management.",
  },
  {
    title: "RIT Nexus",
    category: "Campus Ecosystem App",
    tools: "Flutter, Node.js, Firebase, MySQL",
    image: "/images/rit_nexus.png",
    link: "https://rit-nexus.web.app/",
    github: "https://github.com/nid67/RIT-Nexus",
    description: "A comprehensive campus ecosystem for students, faculty, admin, and exam cell. Streamlines transport management, result viewing, and internal communication.",
  },
  {
    title: "Campus Mate",
    category: "Student Helper App",
    tools: "Java, Android Studio, Firebase",
    image: "/images/campus_mate.png",
    github: "https://github.com/nid67/Campus-Mate",
    description: "An attendance tracker and student assistant app designed to help students manage their daily academic tasks and stay updated with campus life.",
  },
  {
    title: "Triage X",
    category: "AI Assisted Emergency Triage",
    tools: "Python, ML, Flask, Healthcare AI",
    image: "/images/triage_x.png",
    link: "https://triagex-ai-triage-system.streamlit.app",
    github: "https://github.com/nid67/Triage_X",
    description: "An AI-powered emergency triage system designed to prioritize patients based on symptom severity using advanced machine learning models.",
  },
  {
    title: "GFG RIT Events",
    category: "Event Management Website",
    tools: "React.js, Tailwind CSS, GSAP",
    image: "/images/gfg_events.png",
    link: "https://gfg-rit-events.web.app/",
    github: "https://github.com/nid67/gfg-rit-events",
    description: "Dedicated platform for managing events for the GFG student chapter, featuring interactive UI and seamless event registration.",
  },
  {
    title: "Fake News Detector",
    category: "NLP & AI Verification",
    tools: "Python, NLP, Streamlit, Scikit-learn",
    image: "/images/fake_news.png",
    link: "https://fake-news-detector-using-nlp-and-ai-verification-blade67.streamlit.app",
    github: "https://github.com/nid67/Fake-News-Detector-using-NLP-and-AI-Verification",
    description: "A Streamlit-based web app that detects fake news using Logistic Regression. Features article scraping and AI-driven verification logic.",
  },
  {
    title: "Credit Card Fraud Detection",
    category: "Machine Learning (CODSOFT)",
    tools: "Python, Random Forest, SMOTE",
    image: "/images/fraud_detection.png",
    link: "https://github.com/nid67/CODSOFT",
    github: "https://github.com/nid67/CODSOFT",
    description: "Developed a robust fraud detection system to identify suspicious credit card transactions using classification algorithms and data balancing techniques.",
  },
  {
    title: "Spam Detection",
    category: "Machine Learning (CODSOFT)",
    tools: "Python, NLP, Naive Bayes",
    image: "/images/spam_detection.png",
    link: "https://github.com/nid67/CODSOFT",
    github: "https://github.com/nid67/CODSOFT",
    description: "Created an AI-driven SMS/Email spam detector using NLP and Naive Bayes to differentiate between ham and spam messages with high accuracy.",
  },
  {
    title: "Movie Genre Classification",
    category: "Machine Learning (CODSOFT)",
    tools: "Python, TF-IDF, Multi-label Classification",
    image: "/images/movie_genre.png",
    link: "https://github.com/nid67/CODSOFT",
    github: "https://github.com/nid67/CODSOFT",
    description: "Built a model to predict movie genres based on plot summaries using Natural Language Processing and machine learning techniques.",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div
            className="carousel-track-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                width: `${projects.length * 100}%`,
                transform: `translateX(-${(currentIndex * 100) / projects.length}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div
                  className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                  style={{
                    width: `${100 / projects.length}%`,
                    minWidth: `${100 / projects.length}%`,
                  }}
                  key={index}
                >
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{index + 1 < 10 ? `0${index + 1}` : index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <div className="carousel-title-row">
                          <h4>{project.title}</h4>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="project-icon-link"
                                data-cursor="disable"
                                aria-label="View Source Code"
                              >
                                <FaGithub />
                              </a>
                            )}
                            {project.link && project.link !== project.github && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="project-icon-link"
                                data-cursor="disable"
                                aria-label="View Live Project"
                              >
                                <MdArrowOutward />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-description">
                          {project.description}
                        </p>
                        <div className="carousel-tools-section">
                          <span className="tools-label">Tech Stack</span>
                          <div className="carousel-tags-container">
                            {project.tools.split(", ").map((tool, idx) => (
                              <span className="project-tech-tag" key={idx}>
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        {(project.link || project.github) && (
                          <div className="carousel-action" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            {project.link && project.link !== project.github && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="view-project-btn"
                                data-cursor="disable"
                              >
                                View Project
                                <MdArrowOutward className="btn-icon" />
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="view-project-btn"
                                style={project.link && project.link !== project.github ? { background: "transparent", border: "1px solid var(--text-main)", color: "var(--text-main)" } : {}}
                                data-cursor="disable"
                              >
                                View Repository
                                <FaGithub className="btn-icon" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
