import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import ms1 from "../assets/images/ms1.jpg";
import ms2 from "../assets/images/ms2.jpg";
import { Link } from "react-router-dom";

const sliderData = [
  {
    image: ms1,
    badgeText: "Opening Sale Discount 50%",
    title: "SuperMarket For Fresh Grocery",
    description: "Introduced a new model for online grocery shopping and convenient home delivery.",
    link: "#!",
  },
  {
    image: ms2,
    badgeText: "Opening Sale Discount 50%",
    title: "SuperMarket For Fresh Grocery",
    description: "Introduced a new model for online grocery shopping and convenient home delivery.",
    link: "/products",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1500,
  appendDots: (dots) => (
    <div style={{ bottom: "5px" }}>
      <ul style={{ margin: "0px" }}>{dots}</ul>
    </div>
  ),
};

const SlideItem = ({ image, badgeText, title, description, link }) => (
  <div className="px-2">
    <div
      className={styles.imgBox}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundSize: "cover",
        overflow: "hidden",
        borderRadius: "0.5rem",
        backgroundPosition: "center center",
      }}
    >
      <div className="px-lg-12 py-lg-16 col-xxl-5 col-md-7 py-5 px-5 text-xs-center">
        <span className="badge text-bg-warning">{badgeText}</span>
        <h2 className="text-dark display-5 fw-bold mt-4">{title}</h2>
        <p className="lead">{description}</p>
        {link.startsWith("/") ? (
          <Link to={link} className="btn btn-dark mt-3" tabIndex="-1">
            Shop Now <i className="feather-icon icon-arrow-right ms-1"></i>
          </Link>
        ) : (
          <a href={link} className="btn btn-dark mt-3" tabIndex="-1">
            Shop Now <i className="feather-icon icon-arrow-right ms-1"></i>
          </a>
        )}
      </div>
    </div>
  </div>
);

function MainSlider() {
  return (
    <div className={`slider-container overflow-hidden py-5 ${styles.imgBox}`}>
      <Slider {...sliderSettings}>
        {sliderData.map((slide, index) => (
          <SlideItem key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
}

export default MainSlider;
