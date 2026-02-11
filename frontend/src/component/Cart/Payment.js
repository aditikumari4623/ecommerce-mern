import React, { Fragment, useRef, useState } from "react";
import "./Payment.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder } from "../../actions/orderAction.js";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const payBtn = useRef(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentSubmitHandler = (e) => {
    e.preventDefault();

    toast.success("Payment simulated successfully!");

    const order = {
  shippingInfo,
  orderItems: cartItems,
  paymentInfo: {
    id: "dummy_payment_id",
    status: "succeeded",
  },
  paidAt: Date.now(),
  itemsPrice: orderInfo.subtotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharges,
  totalPrice: orderInfo.totalPrice,
  user: user._id,
};


    dispatch(createOrder(order));
    navigate("/success");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={paymentSubmitHandler}>
          <p>Card Info</p>

          <div className="paymentInputBox">
            <CreditCardIcon />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="paymentInput"
              required
            />
          </div>

          <div className="paymentInputBox">
            <EventIcon />
            <input
              type="text"
              placeholder="MM / YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              className="paymentInput"
              required
            />
          </div>

          <div className="paymentInputBox">
            <VpnKeyIcon />
            <input
              type="text"
              placeholder="CVC"
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
              className="paymentInput"
              required
            />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
