import React from 'react';
// import fakeData from '../../fakeData';
import './Inventory.css';

const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch('https://aqueous-reaches-51060.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Description: </span><input type="text"/></p>
                <p><span>Upload Product Image: </span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;