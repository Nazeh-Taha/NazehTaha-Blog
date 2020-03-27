import React, { useState, useEffect } from "react";
import "./style/ContactMe.css";
import NavBar from "../components/navbar/NavBar";
import Fotter from "../components/fotter/Fotter";
import Alert from "../components/Alert";
import image from "../image/christopher-gower-m_HRfLhgABo-unsplash.jpg";
import LoadingScreen from "react-loading-screen";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
//for mail form
const ContactMe = () => {
  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAleart] = useState("");
  const [isSend, setIsSend] = useState(false);
  const override = css`
  height: 14px;
  width: 14px
  margin: 0 auto;
`;

  const sendEmail = async () => {
    setIsSend(true);
    if (name && email && message) {
      await fetch("/api/send-email", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(result => {
          setAleart("THANK YOU FOR YOUR MESSAGE. IT HAS BEEN SENT.");
          setIsSend(false);
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch(error => {
          setAleart("SORRY FAILED SENDING MESSAGE");
        });
    } else {
      setAleart("Sorry Empty Inputs");
    }
  };
  //for loading bage
  setInterval(() => {
    setLoad(false);
  }, 500);

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
            <h1 className="title">Contact me right here</h1>
            <p>“There's not a lot you should do to keep in touch.”</p>
          </div>
        </div>
        <div className="container-contact">
          <div className="contact">
            <div className="hire-me">
              <h4>Hire Me</h4>
              <p>
                I take great pride in what I do and want you to get the best
                possible work. If you’re serious about hiring a web developer I
                am the person who is passionate about his work, I’m the guy to
                talk to. Send me a message using the form or my contact info.
              </p>
            </div>
            <div>
              <form className="contact-info">
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className="input1"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="E-MAIL ADDRESS"
                  className="input2"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
                <textarea
                  placeholder="YOUR MESSAGE HERE"
                  className="input3"
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  required
                />
                <button
                  type="submit"
                  value="CONTACT"
                  className="submit"
                  onClick={e => {
                    sendEmail();
                    e.preventDefault();
                  }}
                >
                  CONTACT{" "}
                  <BeatLoader
                    css={override}
                    size={14}
                    color={"gray"}
                    loading={isSend}
                  />
                </button>
              </form>
              {alert ? <Alert msg={alert} /> : null}
            </div>
          </div>
        </div>
        <Fotter />
      </LoadingScreen>
    </>
  );
};

export default ContactMe;
