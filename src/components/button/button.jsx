import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

const Button = ({ type, text, onClick, width, height, style }) => {
  const buttonStyles =
    style === "outline"
      ? styles.outlineButton
      : style === "custom"
      ? styles.customButton
      : styles.button;

  return (
    <button
      className={`${buttonStyles} ${styles.hoverEffect} font-semibold py-1 px-4 rounded`}
      style={{
        width: width ? width : "100%",
        height: height ? height : "100%",
      }} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  style: PropTypes.oneOf(["filled", "outline", "custom"]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string, 
  height: PropTypes.height,
};

Button.defaultProps = {
  style: "filled",
  type: "button",
  onClick: () => {},
};

export default Button;
