import React from "react";
import styles from "./Footer.module.css";
import amazon from "../assets/images/amazon-pay.png";
import paypal from "../assets/images/logo.png";
import master from "../assets/images/money.png";

import appleStore from "../assets/images/applestore.svg"
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer
      className="bg-dark p-3 py-2 "
      // style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <div className="container">
        <h2 className="text-white pt-3">Get Salla App</h2>
        <p className="text-white">
          We will send you email with link to the app
        </p>

        <form>
          <div className="mb-3 w-75">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control formControl"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <button type="submit" className="btn bg-main text-white ">
            Submit
          </button>
        </form>

        <div className="payment-list py-2 text-white">
          <div className={`${styles.paymentBorder} `}>
            <h5 className="d-inline">Payment Parterns</h5>
            <img
              className={`${styles.paymentIcon} ${styles.ml}`}
              src={amazon}
              alt=""
            />
            <img
              className={`${styles.paymentIcon} ${styles.ml}`}
              src={paypal}
              alt=""
            />
            <img
              className={`${styles.paymentIcon} ${styles.ml}`}
              src={master}
              alt=""
            />
          </div>

          
        </div>
        <p className=" text-sm-center m-0 ">This Site Created By Ali</p>
      </div>
    </footer>
  );
}

export default Footer;
