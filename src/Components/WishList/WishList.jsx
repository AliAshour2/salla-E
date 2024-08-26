import React, { useContext, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import Item from "../Item/Item";
import { wishlistContext } from "../../Context/wishlist";
import axios from "axios";

function WishList() {
  const { wishList, updateWishlist } = useContext(wishlistContext);

  const headers = useMemo(() => {
    return {
      token: localStorage.getItem("userToken"),
    };
  }, []);

  const fetchWishList = useCallback(() => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: headers,
    });
  }, [headers]);

  const { isLoading, error, data } = useQuery("getWishList", fetchWishList, {
    onSuccess: () => {
      updateWishlist(); // Ensure context state is updated
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading wishlist</p>;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 row-cols-sm-1">
          {wishList.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              imageUrl={
                "https://ecommerce.routemisr.com/Route-Academy-products/" + item.images[0]
              }
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

export default WishList;
