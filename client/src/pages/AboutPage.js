import React, { useState } from "react";
import LoadingScreen from "react-loading-screen";
import NavBar from "../components/navbar/NavBar";
import Fotter from "../components/fotter/Fotter";
import {
  faGlobe,
  faMobileAlt,
  faFile
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/AboutPage.css";
import image from "../image/Computer-programmer-working-in-dark-room-070516.jpg";

const AboutPage = () => {
  const [load, setLoad] = useState(true); //for loading bage
  //for loading bages
  setInterval(() => {
    setLoad(false);
  }, 700);

  window.scroll(0, 0);
  return (
    <LoadingScreen loading={load} bgColor="#191919" spinnerColor="white">
      <>
        <NavBar />
        <div className="article-header">
          <div className="overlay"></div>
          <div className="overlay overlay-contact "></div>
          <div className="overlay extra-overlay"></div>
          <img src={image} alt="" />
          <div className="article-contant">
            <h1 className="title">About the blog author</h1>
            <p>“You cannot change what you are, only what you do.”</p>
          </div>
        </div>
        <div className="container-contact">
          <div className="contact">
            <div className="hire-me">
              <h4>ِAbout</h4>
              <p>
                I'm a full-stack web developer, my first experience in building
                the website was under a job title Front-end developer, I've been
                converting PSD files to responsive web pages using Bootstrap,
                HTML, CSS, and JQuery. Switched to Full-stack developer with the
                first project I made using PHP Framework-Laravel and MySQL
                database. I'm back as a Full-stack developer by building a
                website with the help of my group, We created it from the idea
                to deploy using Material-UI, React js, React hooks, React-Redux,
                MongoDB, Express js and Socket io. We communicate well with each
                other using Github, Trello, and Slack. I appreciate teamwork,
                hard work, respect time and I love learning new skills and
                technologies.
              </p>
            </div>
            <div className="contact-info2">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  <p>+970597210029</p>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/nazeh-taha/"
                  >
                    <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                    <p>Linkedin</p>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://github.com/Nazeh-Taha">
                    <FontAwesomeIcon icon={["fab", "github"]} />
                    <p>Github</p>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.facebook.com/nazeh200/">
                    <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    <p>FaceBook</p>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="http://nazeh-taha.herokuapp.com/">
                    <FontAwesomeIcon icon={faGlobe} />
                    <p>Online Portfolio</p>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/1LoJIvac4AdXak0-iyvYjHELpZ9GEGXlR/view"
                  >
                    <FontAwesomeIcon icon={faFile} />
                    <p>My Resume</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Fotter />
      </>
    </LoadingScreen>
  );
};
export default AboutPage;
