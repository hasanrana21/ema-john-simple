import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('https://aqueous-reaches-51060.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        })
    }, [])
    
    useEffect(() =>{
        const saveCard = getDatabaseCart();
        const productKeys = Object.keys(saveCard);

        fetch('https://aqueous-reaches-51060.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data));
        // if(products.length > 0){
        //     const previousKey = productKeys.map(existingKey =>{
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = saveCard[existingKey];
        //         return product;
        //     })
        //     setCart(previousKey);
        //     console.log(productKeys)
        // }
    }, [products])

    const handleButton = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // const productPrice = product.price;
        // console.log(productPrice);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
            <div className="product-side">
                    {
                        products.map(pd => <Product product={pd} handleButton={handleButton} showAddCard={true} key={pd.key}></Product>)
                    }
            </div>
            <div className="card-side">
                <Cart cart={cart}>
                    <Link to="/review"><button className="primary-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;