import Card from "../components/Card/Card";
import React, { useContext } from "react";
import AppContext from "../context";

const Home = ({

  searchValue,
  onChangeSearchInput,
  items,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) => {



  const renderItems = () => {
    return (
      isLoading
        ? [...Array(12)]
        : items.filter((item) => item.title.toLowerCase().includes(searchValue))
    ).map((item) => {
      return (
        <Card
          {...item}
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)}
        
          loading={isLoading}
        />
      );
    });
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `search: ${searchValue}` : "All sneakers"}</h1>
        <div className="search-block d-flex align-center">
          <img src="/img/search.svg" alt="search" />
          <input onChange={onChangeSearchInput} placeholder="Search..." />
        </div>
      </div>

      <div className="sneakers d-flex ">{renderItems()}</div>
    </div>
  );
};

export default Home;
