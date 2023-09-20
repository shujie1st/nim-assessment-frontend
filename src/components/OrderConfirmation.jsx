import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  return (
    <>
      <div>
        <h2>Thank you for your order</h2>
      </div>

      {order && (
        <div className={styles.orderConfirmation}>
          <p>Order ID: {order.id}</p>
          <p>Name: {order.name}</p>
          <p>Address: {order.address}</p>
          <p>Order Items:</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((each) => (
                <tr key={each.item.id}>
                  <td>{each.item.name}</td>
                  <td>${each.item.price}</td>
                  <td>{each.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default OrderConfirmation;
