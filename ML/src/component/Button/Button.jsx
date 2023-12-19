import React from "react";
import "./Button.css"
const Button = ({onClick}) => {
  return (
    <div>
      <button className="btn-53" onClick={onClick}>
        <div className="original">Handle</div>
        <div className="letters">
          <span>H</span>
          <span>A</span>
          <span>n</span>
          <span>d</span>
          <span>l</span>
          <span>e</span>
        </div>
      </button>
    </div>
  );
};

export default Button;
