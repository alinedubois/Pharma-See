import React from "react";
import "./BackTop.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function BackTop() {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    return (
    <>
      <div onClick={scrollTop} className="back-to-top">
        <KeyboardArrowUpIcon style={{ fontSize: "5vh" }} />
      </div>
    </>
  );
}
