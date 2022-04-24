import React from "react";
import classes from "../css/Loader.module.css";

const Loader = () => {
  return (
    <div className="loading-area">
      {/* <span className={classes.loader}>Loading...</span> */}
      <span className={classes["load_anim1"]}></span>
      <span className={classes["load_anim2"]}></span>
    </div>
  );
};

export default Loader;