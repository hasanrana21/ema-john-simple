import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>

            <div className="product-details">
                <h3> <Link to={'/product/'+ key}>{name}</Link> </h3>
                <br/>
                <p><small>by:</small> {seller}</p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon.</small></p>
                {props.showAddCard === true && <button onClick={() => props.handleButton(props.product)} className="primary-btn"><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>}
            </div>
        </div>
    );
};

export default Product;