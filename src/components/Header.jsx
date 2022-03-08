import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

const Header = ({ onClickCart }) => {

  const { cartItems } = useContext(AppContext)


  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)
  


  return (
    <header className="d-flex justify-between align-center p-40	">
     <Link to="/">
     <div className="headerRight d-flex align-center">
        <img width="40px" height="40px" src="img/logo.png" alt="logo" />
        <div className="headerInfo ml-15">
          <h3>React sneakers</h3>
          <p>Best sneakers store</p>
        </div>
      </div>
     </Link>

      <ul className="headerRight d-flex align-center	">
        <li onClick={onClickCart} className="mr-30 d-flex align-center cu-p">
          <img width="20px" height="20px" src="img/cart.svg" alt="cart" />
          <span className="ml-10">${ totalPrice }</span>
        </li>

        <li className="mr-40 d-flex align-center cu-p">
          <Link to="/favorites">
          
            <img
              width="20px"
              height="20px"
              src="img/heart.png"
              alt="favorite"
            />
          </Link>
        </li>

     <Link to="/orders">
     <li>
          <img width="20px" height="20px" src="img/user.png" alt="user" />
        </li>
     </Link>
      </ul>
    </header>
  );
};

export default Header;
