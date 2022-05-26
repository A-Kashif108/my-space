import React from "react";
import { ButtonProps } from "../../types/buttonPropType";
import './button.css';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { onClick, text } = props;
    return <button className="button" onClick={onClick}>{text}</button>;
  };
  
  // This Folder is used for different re-usable components that can be re-used in the WebApp
  
  export default Button;