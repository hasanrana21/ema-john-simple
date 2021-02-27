import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const total = cart.reduce( (total, prd) => total + prd.price , 0)
// total
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    // shipping
    let shipping = parseFloat(0);
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    // tax
    let tax = (total/10).toFixed(2);

    //  grand total 
    const grandTotal = parseFloat(total + shipping + Number(tax)).toFixed(2);

    // format Number
    const formatNumber = num =>{
        const precission = num.toFixed(2);
        return Number(precission);
    }
    return (
        <div className="added-cart">
            <h3>Ordered Summery</h3>
            <h3>Items Ordered: {props.cart.length}</h3>
            <p>Itmes Price: ${formatNumber(total)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>Tax + VAT: ${tax}</small></p>
            <p>Total: ${grandTotal}</p>
        </div>
    );
};

export default Cart;