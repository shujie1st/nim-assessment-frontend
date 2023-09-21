import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    setNameErrorMessage("");
    setPhoneErrorMessage("");
    setAddressErrorMessage("");

    let valid = true;
    let fortmattedPhone = "";

    if (!name) {
      setNameErrorMessage("Name can't be empty");
      valid = false;
    }

    if (!phone) {
      setPhoneErrorMessage("Phone can't be empty");
      valid = false;
    } else if (!phone.match("^[-()0-9]+$")) {
      setPhoneErrorMessage(
        `Phone number only allows numbers and the characters "-", "(", and ")"`
      );
      valid = false;
    } else {
      const filteredPhoneNumber = phone
        .split("")
        .filter((each) => each.match("^[0-9]+$"))
        .join("");
      if (filteredPhoneNumber.length !== 10) {
        setPhoneErrorMessage("Please input a 10-digit phone number");
        valid = false;
      } else {
        const partOne = filteredPhoneNumber.slice(0, 3);
        const partTwo = filteredPhoneNumber.slice(3, 6);
        const partThree = filteredPhoneNumber.slice(6);
        fortmattedPhone = `(${partOne})${partTwo}-${partThree}`;
      }
    }

    if (!address) {
      setAddressErrorMessage("Address can't be empty");
      valid = false;
    }

    if (valid) {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone: fortmattedPhone,
          address,
          items: order
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        const { id } = data;
        navigate(`/order-confirmation/${id}`);
      }
    }
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
                required
              />
            </label>
          </div>
        </form>

        <span className={styles.alert}>
          <p>{nameErrorMessage}</p>
          <p>{phoneErrorMessage}</p>
          <p>{addressErrorMessage}</p>
        </span>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
