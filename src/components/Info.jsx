import React, { useContext } from "react";


const Info = ({ title, description, image }) => {
  

  return (
    <div className="emptyBag">
      <h1>{title}</h1>
      <img className="bag" src={image} />
      <h2>{description}</h2>
    </div>
  );
};

export default Info;
