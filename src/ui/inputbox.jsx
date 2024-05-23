import React from "react";

function InputBox({ handleInput, placeholderText, value }) {
  return (
    <textarea
      name="inputFiled"
      type="text"
      onChange={handleInput}
      className="outline-indigo-600 border border-2 border-indigo-600 rounded-lg w-full h-full resize-none"
      style={{ padding: "8px" }}
      placeholder={placeholderText}
      value={value}
    />
  );
}

export default InputBox;
