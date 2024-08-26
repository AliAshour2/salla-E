import React, { useContext, useState } from "react";
import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/cartContext";

function CheckOut() {
  let { cartOnlinePayment } = useContext(cartContext);
  async function callPayment(values) {
    console.log(values);
    let { data } = await cartOnlinePayment(values);
    window.location.href = data.session.url
  }
  const validationSchema = Yup.object({
    details: Yup.string()
      .min(10, "Too Short")
      .max(500, "Too Long")
      .required("Details is Requird"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "Invalid Phone Number")
      .required("Phone is required"),
    city: Yup.string()
      .required("City is required")
      .oneOf([
        "Alexandria",
        "Aswan",
        "Asyout",
        "Bani Sueif",
        "Beheira",
        "Cairo",
        "Daqahlia",
        "Dumiat",
        "El Bahr El Ahmar",
        "El Ismailia",
        "El Suez",
        "El Wadi El Gedeed",
        "Fayoum",
        "Gharbia",
        "Giza",
        "Helwan",
        "Kafr El Sheikh",
        "Luxor",
        "Matrouh",
        "Menia",
        "Menofia",
        "North Sinai",
        "Port Said",
        "Qalubia",
        "Qena",
        "Sharqia",
        "Sixth of October",
        "Sohag",
        "South Sinai",
      ]),
  });
  let paymentForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,

    onSubmit: callPayment,
  });

  return (
    <>
      <div className="container ">
        <div className="w-50 mx-auto my-5">
          <div className="p-y mx-auto ">
            <h2 className="py-2">Shipping Address</h2>
          </div>
          <form onSubmit={paymentForm.handleSubmit} className="">
            <div className="form-group mb-3">
              <label className="form-label mb-1" htmlFor="details">
                Details
              </label>
              <input
                className="form-control"
                type="text"
                id="details"
                name="details"
                placeholder="Detalis"
                onBlur={paymentForm.handleBlur}
                value={paymentForm.values.details}
                onChange={paymentForm.handleChange}
              />
              {paymentForm.errors.details && paymentForm.touched.details ? (
                <div className="alert alert-danger">
                  {paymentForm.errors.details}
                </div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-control"
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={paymentForm.values.phone}
                onBlur={paymentForm.handleBlur}
                onChange={paymentForm.handleChange}
              />
              {paymentForm.errors.phone && paymentForm.touched.phone ? (
                <div className="alert alert-danger">
                  {paymentForm.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label mb-1" htmlFor="city">
                City
              </label>
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={paymentForm.values.city}
                onChange={paymentForm.handleChange}
                onBlur={paymentForm.handleBlur}
              />

              {paymentForm.errors.city && paymentForm.touched.city ? (
                <div className="alert alert-danger">
                  {paymentForm.errors.city}
                </div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success w-100">Pay Now</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
