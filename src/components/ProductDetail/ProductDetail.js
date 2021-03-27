import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://aqueous-reaches-51060.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data[0]))
    }, [productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>Add {productKey} Very Soon...</h1>
            <Product showAddCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;