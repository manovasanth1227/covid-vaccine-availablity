import classes from "./Footer.module.css";
import React from "react";
import Fab from "@material-ui/core/Fab";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export const Footer = ({ css }) => {
  return (
    <div
      className={
        css ? `${classes.footer}  ${classes.adjustment}` : `${classes.footer}`
      }
    >
      <div className={classes.strike}></div>
      <div className={classes.social}>
        <Fab
          onClick={(e) =>
            (window.location.href = "https://www.instagram.com/k_itz_.mano._/")
          }
          size="small"
          aria-label="instagarm"
        >
          <InstagramIcon style={{ color: "#e4405f" }} />
        </Fab>
        <Fab
          onClick={(e) =>
            (window.location.href =
              "https://www.linkedin.com/in/manovasanth-b-352200199")
          }
          size="small"
          aria-label="linkedin"
        >
          <LinkedInIcon style={{ color: "#0e76a8" }} />
        </Fab>
        <Fab
          onClick={(e) =>
            (window.location.href = "https://twitter.com/Manovasanth7?s=09")
          }
          size="small"
          aria-label="twitter"
        >
          <TwitterIcon style={{ color: "#55acee" }} />
        </Fab>
        <Fab
          onClick={(e) =>
            (window.location.href =
              "https://www.youtube.com/channel/UCwZiWtJKWMlDT7Kw9TArYUw")
          }
          size="small"
          aria-label="youtube"
        >
          <YouTubeIcon style={{ color: "#cd201f" }} />
        </Fab>
        <a href="mailto:manovasanth1227@gmail.com">
          <Fab size="small" aria-label="email">
            <MailOutlineIcon style={{ color: "#0084ff" }} />
          </Fab>
        </a>
      </div>
      <p>Created By Manovasanth Balasankar | © 2021 All rights reserved.</p>
    </div>
  );
};
