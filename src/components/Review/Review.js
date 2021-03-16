import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    useEffect(()=>{
        const saveCard = getDatabaseCart();
        const productKeys = Object.keys(saveCard);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCard[key];
            return product;
        });
        setCart(cartProducts);
        // console.log(cartProducts);
    },[])
    const removeButton = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const history = useHistory();
    const placeProceedCheckout = () => {
        history.push("/shipment");
    }
    

    let thankYou;
    if(placeOrder){
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-side">
                {
                    cart.map(pd => <Reviewitem product={pd} key={pd.key} removeButton={removeButton}></Reviewitem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="card-side">
                <Cart cart={cart}>
                    <button onClick={placeProceedCheckout} className="primary-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;