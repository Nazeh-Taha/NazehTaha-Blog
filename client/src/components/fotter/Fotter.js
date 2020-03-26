import React from "react";
import { Link } from "react-router-dom";
import "./Fotter.scss";
import Logoo from "../../image/logo.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import ScrollToo from "../scrollTo/ScrollTo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab, faGlobe);

const Fotter = () => {
  return (
    <div className="fotter">
      <ScrollToo />
      <div className="fotter-contant">
        <img src={Logoo} alt="logo" />

        <ul>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/nazeh-taha/">
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.facebook.com/nazeh200/">
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.instagram.com/nazeh_taha/">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
          </li>
          <li>
            <a target="_blank" href="http://nazeh-taha.herokuapp.com/">
              <FontAwesomeIcon icon={faGlobe} />
            </a>
          </li>
        </ul>
        <p>Created By "Nazeh Taha"</p>
      </div>
    </div>
  );
};

export default Fotter;
