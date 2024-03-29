import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
      const saveCard = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: saveCard, shipment: data, orderTime: new Date()}

      fetch('https://aqueous-reaches-51060.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder();
          alert('your order placed successfully')
        }
      })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.name && <span className="error">Name is required</span>}
    
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}

      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone"/>
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input name="address" ref={register({ required: true })}  placeholder="Your Address"/>
      {errors.address && <span className="error">Address is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;