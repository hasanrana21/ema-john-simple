import React, { useState } from 'react';
import fakeData from '../../fakeData';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    console.log(products)
    return (
        <div>
            <h1>this is shop</h1>
            <ul>
                {
                    products.map(product => <li>{product.seller}</li>)
                }
            </ul>
        </div>
    );
};

export default Shop;