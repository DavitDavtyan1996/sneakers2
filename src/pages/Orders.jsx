import Card from "../components/Card/Card";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context";

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6211461801ccdac074208054.mockapi.io/orders"
        );
        setOrders(
          data.reduce((prev, obj) => [...prev, ...obj.items], []).flat()
        );
        setIsLoading(false);
      } catch (error) {
        alert("order error");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <h1 className="mb-40">My orders</h1>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(12)] : orders).map((item) => {
          return (
            <Card
              {...item}
              loading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
