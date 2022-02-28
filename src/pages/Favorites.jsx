import Card from "../components/Card/Card";
import React, { useContext } from "react";
import AppContext from "../context";

const Favorites = ({  onAddToFavorite }) => {

  const {favorites} = useContext(AppContext)



  return (
    <div className="content p-40">
      <h1 className="mb-40">My favorites</h1>
      <div className="d-flex flex-wrap">
        {favorites.map((item) => {
          return (
            <Card
              key={item.id}
              {...item}
              favorited={true}
              onFavorite={onAddToFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
