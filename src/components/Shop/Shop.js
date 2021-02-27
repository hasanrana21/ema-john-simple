import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    // console.log(products)

    const handleButton = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        // const productPrice = product.price;
        // console.log(productPrice);
    }
    return (
        <div className="shop-container">
            <div className="product-side">
                    {
                        products.map(pd => <Product product={pd} handleButton={handleButton}></Product>)
                    }
            </div>
            <div className="card-side">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;