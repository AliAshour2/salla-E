import React from "react";
import axios from "axios";
import Item from "../Item/Item";
import { useQuery } from "react-query";

function FeaturedProducts() {
  const getFeaturedProduct = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const { isLoading, error, data } = useQuery("featuredProducts", getFeaturedProduct, {
    cacheTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured products</p>;

  return (
    <div className="container">
      <div className="row py-5">
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 row-cols-sm-1">
          {data?.data.data.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              imageUrl={item.images[0]}
              title={item.title}
              category={item.category.name}
              rating={item.ratingsAverage}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
