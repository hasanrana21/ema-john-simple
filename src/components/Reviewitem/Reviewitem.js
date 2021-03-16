import React from "react";
import "./Reviewitem.css";

const Reviewitem = (props) => {
  // console.log(props.product);
  const { name, quantity, key, img, price } = props.product;
  return (
    <div className="product-details review-item">
      <div className='review-img'>
        <img src={img} alt="" />
      </div>
      <div className="review-txt">
        <h3>{name}</h3>
        <p>Quantity: {quantity}</p>
        <p><small>Price: ${price}</small></p>
        <br />
        <button onClick={() => props.removeButton(key)} className="primary-btn">
          Remove
        </button>
      </div>
    </div>
  );
};

export default Reviewitem;
