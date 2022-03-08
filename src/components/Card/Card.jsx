import  { useState } from "react";
import ContentLoader from "react-content-loader";
import s from ".//Card.module.scss";
import React, { useContext } from "react";
import AppContext from "../../context";

const Card = ({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading,
}) => {
  const { isItemAdded } = useContext(AppContext);


  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = { id, parentId: id,  title, price, imageUrl }

  const onClickPlus = () => {
    onPlus(obj);

  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  return (
    <div className={s.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="9" ry="9" width="150" height="90" />
          <rect x="113" y="150" rx="10" ry="10" width="34" height="34" />
          <rect x="0" y="100" rx="10" ry="10" width="150" height="16" />
          <rect x="0" y="125" rx="10" ry="10" width="100" height="16" />
          <rect x="0" y="160" rx="10" ry="10" width="70" height="24" />
        </ContentLoader>
      ) : (
        <div>
          <div className={s.favorite} onClick={onClickFavorite}>
        { onFavorite &&    <img
              width="40px"
              height="40px"
              src={
                isFavorite ? "img/hearth.liked.png" : "img/hearth.unliked.png"
              }
              alt="unliked"
            />}
          </div>
          <img
            className={s.mb - 10}
            width={133}
            height={132}
            src={imageUrl}
            alt="Sneakers"
          />
          <p>{title}</p>
          <div className={s.info}>
            <div className={s.infoPrice}>
              <span>Price</span>
              <b>$ {price}</b>
            </div>

     { onPlus &&       <img
              onClick={onClickPlus}
              className={s.plus}
              width={35}
              height={35}
              src={isItemAdded(id) ? "img/btn-checked.png" : "img/plus.png"}
            />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
