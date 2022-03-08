import { createContext, useEffect, useState } from "react";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://6211461801ccdac074208054.mockapi.io/cart"
        );

        const favoritesResponse = await axios.get(
          "https://6211461801ccdac074208054.mockapi.io/favorites"
        );

        const itemsResponse = await axios.get(
          "https://6211461801ccdac074208054.mockapi.io/items"
        );

        setIsLoading(false);

        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("error axios");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => +item.parentId === +obj.id);
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => +item.parentId !== +obj.id)
        );
        await axios.delete(
          `https://6211461801ccdac074208054.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://6211461801ccdac074208054.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {}
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6211461801ccdac074208054.mockapi.io/favorites/${obj.id}`
        );

        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6211461801ccdac074208054.mockapi.io/favorites",
          obj
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6211461801ccdac074208054.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => +obj.parentId === +id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorite,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
            element={
              <Home
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="favorites"
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />

          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
