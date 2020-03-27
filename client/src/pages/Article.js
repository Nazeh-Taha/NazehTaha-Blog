import React, { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import NavBar from "../components/navbar/NavBar";
import Fotter from "../components/fotter/Fotter";
import Comments from "../components/comment/Comment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";
import "./style/Article.css";

library.add(fab, faGlobe, faTwitter);
const Article = ({ match }) => {
  const shareUrl = window.location.href; //share link
  const [load, setLoad] = useState(true);
  const id = match.params.id;
  const [articleInfo, setArticleInfo] = useState([
    {
      image: "",
      title: "",
      body: "",
      time: ""
    }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/article/${id}`);
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

        <div className="article-header">
          <div className="overlay"></div>
          <img src={articleInfo.image} alt="" />
          <div className="article-contant">
            <span>{articleInfo.categore}</span>
            <h1>{articleInfo.title}</h1>
            <p className="post-date">{articleInfo.time}</p>
          </div>
        </div>
        <section
          dangerouslySetInnerHTML={{
            __html: articleInfo.body
          }}
          className="contant-section"
        />

        <div className="social-share">
          <div className="socila-share-link">
            <FacebookShareButton
              url={shareUrl}
              quote={articleInfo.title}
              className="Demo__some-network__share-button"
            >
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </FacebookShareButton>
          </div>
          <div className="socila-share-link">
            <LinkedinShareButton
              url={shareUrl}
              title={articleInfo.title}
              summary={articleInfo.image}
              source={articleInfo.image}
              className="Demo__some-network__share-button"
            >
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
            </LinkedinShareButton>
          </div>
          <div className="socila-share-link">
            <TwitterShareButton
              url={shareUrl}
              quote={articleInfo.title}
              className="Demo__some-network__share-button"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </TwitterShareButton>
          </div>
        </div>
        <Comments id={id} />
        <Fotter />
      </LoadingScreen>
    </>
  );
};

export default Article;
