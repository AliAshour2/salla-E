import React, { useEffect, useState } from "react";
import styles from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

import { useQuery } from "react-query";

function CategoriesSlider() {
  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, error, data, isFetching } = useQuery(
    "featureProducts",
    getFeaturedProducts,
    {
      cacheTime: 1000 * 60 * 100, 
      staleTime: 1000 * 60 * 200,
    }
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="container">
        <h2>Featured Categories</h2>
      </div>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {data?.data.data.map((cat) => (
              <div className="item px-1" key={cat._id}>
                <img
                  className="w-100"
                  height={"150px"}
                  src={cat.image}
                  alt="categories images"
                />
                <h6>{cat.name}</h6>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default CategoriesSlider;

// const [categories, setCategories] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState(null);

// async function getCategories() {
//   try {
//     let { data } = await axios.get(
//       "https://ecommerce.routemisr.com/api/v1/categories"
//     );
//     setCategories(data.data);
//   } catch (error) {
//     setError("Failed to fetch categories. Please try again later.");
//   } finally {
//     setIsLoading(false);
//   }
// }

// useEffect(() => {
//   getCategories();
// }, []);
