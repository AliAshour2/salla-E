import React from "react";
import styles from "./BrandsMarquee.module.css";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { useQuery } from "react-query";

function BrandsMarquee() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, data, error } = useQuery("getBrands", getBrands);

  return (
    <>
      <Marquee className="py-5" speed={150} gradientWidth={100} gradientColor={[248, 251, 253]}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-danger">Failed to load brands. Please try again later.</p>
        ) : (
          data?.data.data.map((item) => (
            <div key={item._id} className="mx-3">
              <img src={item.image} className="w-75" alt={item.name} />
            </div>
          ))
        )}
      </Marquee>
    </>
  );
}

export default BrandsMarquee;
