import React from "react";

function InputField(props) {
  const { name, value, handleChange, label, type, error } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={handleChange}
      />
      {error && (
        <div className="text-danger mt-1 mb-2 ">
          <p>
            <small>{error}</small>
          </p>
        </div>
      )}
    </div>
  );
}

export default InputField;
