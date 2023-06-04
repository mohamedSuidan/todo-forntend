import React from "react";

function Button({ text, theClass, click, id }) {
  return (
    <button className={theClass} onClick={click} id={id}>
      {text}
    </button>
  );
}

export default Button;
