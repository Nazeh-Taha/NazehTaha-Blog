import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Comment.scss";
library.add(fab, faGoogle);

const Comment = ({ id }) => {
  const [allComment, setAllComment] = useState({});
  const [comment, setComment] = useState("");
  const [facebook, setFacebook] = useState({
    name: "",
    picture: ""
  });
  //send comment and sender info to server
  const sendInfo = async () => {
    await fetch("/api/article/comments", {
      method: "post",
      body: JSON.stringify({
        postId: id,
        name: facebook.name,
        picture: facebook.picture,
        comment: comment
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    setComment('');
  };
  //for google login
  const responseGoogle = response => {
    try {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name: response.Rt.Ad, picture: response.Rt.kL })
      );
      setFacebook({
        name: response.Rt.Ad,
        picture: response.Rt.kL
      });
    } catch {
      console.log("error");
    }
  };
  //for facebook login
  const responseFacebook = response => {
    try {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: response.name,
          picture: response.picture.data.url
        })
      );
      setFacebook({
        name: response.name,
        picture: response.picture.data.url
      });
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setFacebook({
        name: userInfo.name,
        picture: userInfo.picture
      });
    }
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      const result = await fetch(`/api/article/comments/${id}`);
      const body = await result.json();
      setAllComment(body);
      
    };
    fetchComment();
   
  }, [allComment]);

  const componentClicked = () => {};

  
  return (
    <div className="comment-container">
      <h2>{allComment.length} Comments</h2>
      {allComment.length
        ? allComment.map((item, key) => (
            <div className="comment" key={key}>
              <div className="comment-img">
                <img src={item.picture} alt="" />
              </div>
              <div className="comment-text">
              <h3>{item.name}</h3>
              <span className="time-span">{item.time}</span>
        <p>{item.comment}</p>
              </div>
            </div>
          ))
        : null}
      {facebook.name ? (
        <div className="comment-input">
          <h2>Post A Comment</h2>
          <textarea
            placeholder="Write your comment here..."
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
          <input type="submit" value="SUBMIT" onClick={() => sendInfo()} />
        </div>
      ) : (
        <div className="social-login">
          <p>Login To Comment</p>
          <FacebookLogin
            appId="560752488125515"
            autoLoad={false}
            fields="name,picture"
            icon={<FontAwesomeIcon icon={["fab", "facebook-f"]} />}
            textButton=""
            cssClass="face-log"
            onClick={() => componentClicked}
            callback={responseFacebook}
          />

          <GoogleLogin
            clientId="20817296394-rbgm22c52mkvn9n4afneag376utjpp2l.apps.googleusercontent.com"
            buttonText={<FontAwesomeIcon icon={faGoogle} />}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            icon={false}
            className="face-log"
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
