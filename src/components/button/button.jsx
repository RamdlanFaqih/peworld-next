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
      }} // Menggunakan width: 100% jika width tidak diisi
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
  width: PropTypes.string, // Menambahkan properti width
  height: PropTypes.height,
};

Button.defaultProps = {
  style: "filled",
  type: "button", // Mengatur nilai default untuk properti type
  onClick: () => {},
};

export default Button;
