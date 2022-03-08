import React, { useContext, useState } from "react";
import AppContext from "../context";
import Info from "./Info";
import axios from "axios";

const Drawer = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems } = useContext(AppContext);

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = (totalPrice / 100) * 5;

  const OnClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6211461801ccdac074208054.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      cartItems.forEach((item) => {
        axios.delete(
          "https://6211461801ccdac074208054.mockapi.io/cart",
          item.id
        );
      });
    } catch (error) {
      alert("err");
      setIsLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-40 d-flex align-center justify-between ">
          Bag
          <img
            onClick={onClose}
            className="removeBtn"
            width="40px"
            height="40px"
            src="img/btn-remove.png"
          />
        </h2>

        {items.length > 0 ? (
          <div className="items">
            {items.map((obj) => {
              return (
                <div
                  key={obj.id}
                  className="cartItem d-flex  justify-between	 align-center mb-20	"
                >
                  <div className="d-flex align-center">
                    <img
                      className="mr-20"
                      width={75}
                      height={75}
                      src={obj.imageUrl}
                      alt="Sneakers"
                    />
                    <div className="mr-40">
                      <p className="mb-5">{obj.title}</p>
                      <b>$ {obj.price}</b>
                    </div>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    width="40px"
                    height="40px"
                    src="img/btn-remove.png"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order complete" : "Bag is empty"}
            image={isOrderComplete ? "img/order.jpg" : "img/bag.png"}
            description={
              isOrderComplete
                ? `Your order ${orderId} will come soon`
                : `Please check sneakers`
            }
          />
        )}

        {isOrderComplete == false && (
          <div className="cartTotalBlog">
            <ul>
              <li className="d-flex mb-15	">
                <span>Total:</span>

                <div></div>
                <b>$ {totalPrice}</b>
              </li>
              <li className="d-flex  mb-40	">
                <span>Cost of delivery 5%:</span>

                <div></div>
                <b>$ {tax}</b>
              </li>
            </ul>

            <button
              onClick={OnClickOrder}
              className="greenButton d-flex align-center justify-center"
            >
              Order checkout
              <img width={20} height={20} src="img/arrow.png" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
