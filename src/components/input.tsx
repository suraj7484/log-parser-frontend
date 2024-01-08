import React, { InputHTMLAttributes } from "react";
import "../assets/styles/components/input.scss";
import { UseFormRegister } from "react-hook-form";

interface FormData {
    [key: string]: string;
}

interface InputPropTypes extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type: string;
    placeholder: string;
    name: string;
    register?: any;
    filename?: string;
}

const Input: React.FC<InputPropTypes> = ({
    className = "",
    type = "text",
    placeholder,
    register,
    name,
    filename,
    ...inputProps
}) => {

  return (
    <React.Fragment>
      { type != "file" && (
        <input
          className={`common-input ${className}`}
          type={type}
          placeholder={ placeholder }
          {...inputProps}
          {...register(name)}
      />)}
      { type == "file" && (
        <div className="label-wrapper">
          <label className="custom-file-input">
            { filename || 'Choose File'}
              <input
                type={ type }
                placeholder={ placeholder }
                {...inputProps}
              />
          </label>
        </div>
     )}
    </React.Fragment>
  );
};

export default Input;
