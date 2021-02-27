import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    console.log(products)

    const handleButton = (product) =>{
        console.log('button clicked and cart added', product)
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-side">
                    {
                        products.map(pd => <Product product={pd} handleButton={handleButton}></Product>)
                    }
            </div>
            <div className="card-side">
                <h3>Order Summery: {cart.length}</h3>
            </div>
        </div>
    );
};

export default Shop;