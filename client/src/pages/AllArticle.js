import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Fotter from "../components/fotter/Fotter";
import LoadingScreen from "react-loading-screen";
import image from "../image/blog.jpg";
import "./style/AllArticle.css";
import axius from "axios";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  height: 10px;
  width: 10px
  margin: 0 auto;
`;
const AllArticle = () => {
  const [load, setLoad] = useState(true);
  const [articles, setArticles] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(4);
  const [articleSize, setArticleSize] = useState(0);
  const [isSend, setIsSend] = useState(false);
  useEffect(() => {
    const range = {
      skip: Skip,
      limit: limit
    };
    getArtiles(range);
    setIsSend(false);
  }, []);
  const getArtiles = async range => {
    setIsSend(true);
    await axius.post("/api/allarticles/", range).then(response => {
      if (response.data.success) {
        setArticles(articles.concat(response.data.articles));
        setArticleSize(response.data.articleSize);
        setIsSend(false);
      } else {
        alert("error fetch data");
      }
    });
    setLoad(false);
  };

  const loadMore = () => {
    let skip = Skip + limit;
    const range = {
      skip: skip,
      limit: limit
    };
    getArtiles(range);
    setSkip(skip);
  };
  return (
    <>
      <LoadingScreen loading={load} bgColor="#191919" spinnerColor="white">
        <NavBar />
        <div className="article-header">
          <div className="overlay"></div>
          <div className="overlay overlay-contact "></div>
          <div className="overlay extra-overlay"></div>
          <img src={image} alt="" />
          <div className="article-contant">
            <h1 className="title">ALL ARTICLES</h1>
            <p>“Think before you speak. Read before you think.”</p>
          </div>
        </div>
        <div className="articles-conainer">
          {articles.map((item, key) => (
            <div className="oneArticle-container" key={key}>
              <img src={item.image}></img>
              <Link to={`/article/${item._id}`}>
                <h1>
                  <span className="time-span">
                    {item.time.substring(0, 6) + " "}
                  </span>
                  {item.title}
                </h1>
              </Link>
              <section
                dangerouslySetInnerHTML={{
                  __html: item.body.substring(0, 200) + "....</p>"
                }}
              />
              <Link to={`/article/${item._id}`} className="read-more">
                READ MORE
              </Link>
            </div>
          ))}
          {articleSize >= limit && (
            <div className="load-more-btn">
              <button onClick={loadMore}>
                LOAD MORE
                <BeatLoader
                  css={override}
                  size={10}
                  color={"white"}
                  loading={isSend}
                />
              </button>
            </div>
          )}
        </div>
        <Fotter />
      </LoadingScreen>
    </>
  );
};

export default AllArticle;
