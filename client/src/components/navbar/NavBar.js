import React, { useState, useEffect } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { Link, NavLink } from "react-router-dom";
import Logoo from "../../image/logo.svg";
import "./NavBar.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileNav from "./MobileNav";

library.add(fab, faGlobe);

const NavBar = () => {
  // get the width of screen
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  return (
    <>
      {width < 1150 ? (
        <MobileNav width={width} />
      ) : (
        <Controller>
          <Scene triggerHook="onLeave" duration={300} pin>
            {progress => (
              <Timeline totalProgress={progress} paused>
                <Tween
                  from={{ height: "150px" }}
                  to={{ height: "80px", background: "#191919" }}
                >
                  <div className="header">
                    <div className="nav-logo">
                      <Link to="/">
                        <div className="logo-container">
                          <Timeline totalProgress={progress} paused>
                            <Tween
                              from={{ height: "150px" }}
                              to={{ height: "70px" }}
                            >
                              <img src={Logoo} alt="logo" />
                            </Tween>
                          </Timeline>
                        </div>
                      </Link>
                    </div>

                    <div className="nav-links">
                      <ul>
                        <li >
                          <NavLink exact to="/" activeClassName="home">HOME</NavLink>
                        </li>
                        <li>
                          <NavLink to="/articles-list" activeClassName="home">ARTICLES</NavLink>
                        </li>
                        <li>
                          <NavLink to="/about" activeClassName="home">ABOUT ME</NavLink>
                        </li>
                        <li>
                          <NavLink to="/contact" activeClassName="home">CONTACT</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="nav-social">
                      <ul>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/in/nazeh-taha/"
                          >
                            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.facebook.com/nazeh200/"
                          >
                            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://www.instagram.com/nazeh_taha/"
                          >
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="http://nazeh-taha.herokuapp.com/"
                          >
                            <FontAwesomeIcon icon={faGlobe} />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Tween>
              </Timeline>
            )}
          </Scene>
        </Controller>
      )}
    </>
  );
};

export default NavBar;
