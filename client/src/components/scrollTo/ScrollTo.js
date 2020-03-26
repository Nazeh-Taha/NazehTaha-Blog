import React, { useRef, useState, useEffect } from "react";
import { TweenMax, Power3 } from "gsap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Scroll from "react-scroll";
import "./ScrollTo.scss";

library.add(faAngleDoubleUp);
let Link = Scroll.Link;
let scrolll = Scroll.animateScroll;

const ScrollToo = () => {
  //scroll to top fun
  const scrollToTop = () => {
    scrolll.scrollToTop();
  };

  let scroll = useRef(null);
  const [height, setHeight] = useState(window.scrollY);

  const updateWidthAndHeight = () => {
    setHeight(window.scrollY);
  };
  useEffect(() => {
    
    if (height > 900) {
      TweenMax.to(scroll, 0.5, { visibility: "visible", ease: Power3.ease });
    } else {
      TweenMax.to(scroll, 0.5, { visibility: "hidden", ease: Power3.ease });
    }
    window.addEventListener("scroll", updateWidthAndHeight);
    return () => window.removeEventListener("scroll", updateWidthAndHeight);
  });

  return (
    <div
      className="scroll-to"
      ref={el => {
        scroll = el;
      }}
    >
      <Link onClick={() => scrollToTop()}>
        <FontAwesomeIcon icon={faAngleDoubleUp} />
      </Link>
    </div>
  );
};

export default ScrollToo;
