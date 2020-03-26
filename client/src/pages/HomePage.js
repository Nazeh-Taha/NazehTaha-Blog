import React, { useRef, useState, useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import Fotter from "../components/fotter/Fotter";
import { TweenMax, Power3 } from "gsap";
import { Link } from "react-router-dom";
import LoadingScreen from "react-loading-screen";

const HomePage = () => {
  let desc = [];
  const setRef = ref => {
    desc.push(ref);
  };
  const [load, setLoad] = useState(true); //for loading bage
  const [articleInfo, setArticleInfo] = useState([
    {
      image: "",
      title: "",
      body: "",
      time: ""
    }
  ]);

  const onHover = i => {
    TweenMax.to(desc[i], 0.2, {
      height: 130,
      ease: Power3.easeOut
    });
    TweenMax.to(desc[i], 0.2, {
      opacity: 1,
      ease: Power3.easeOut,
      delay: 0.2
    });
  };
  const onLeave = i => {
    TweenMax.to(desc[i], 0.2, { height: 0, ease: Power3.easeOut });
    TweenMax.to(desc[i], 0.2, {
      opacity: 0,
      ease: Power3.easeOut,
      delay: 0.2
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/newArticle/");
      const body = await result.json();
      setArticleInfo(body);
      //for loading bage
      setLoad(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <LoadingScreen loading={load} bgColor="#191919" spinnerColor="white">
        <NavBar />
        <div className="grid-container">
          {articleInfo.map((item, i) => (
            <div className="grid-item" key={i} onMouseLeave={() => onLeave(i)}>
              <img className="homeImage" src={item.image} alt="" />
              <div className="overlay" onMouseEnter={() => onHover(i)}></div>
              <div className="subContant">
                <p className="cat-title">{item.categore}</p>
                <Link to={`/article/${item._id}`}>
                  <h1>{item.title}</h1>
                </Link>
                <section
                  ref={setRef}
                  dangerouslySetInnerHTML={{
                    __html: item.body.substring(0, 180) + "....</p>"
                  }}
                ></section>
                <p className="article-time">{item.time} | BY ADMIN</p>
              </div>
            </div>
          ))}
        </div>
        <Fotter />
      </LoadingScreen>
    </>
  );
};
export default HomePage;
