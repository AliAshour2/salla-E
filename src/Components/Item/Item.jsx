import React, { useContext, useEffect, useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";
import { cartContext } from "../../Context/cartContext";
import { wishlistContext } from "../../Context/wishlist";
import LazyImage from "../LazyImage/LazyImage";
import ItemPlaceholder from "./ItemPlaceholder";
import IconButton from "../Ui/IconButton/IconButton";
import StarRating from "../Ui/StarRating/StarRating";

const Item = memo(({ id, imageUrl, title, category, rating, price }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [addedToWishList, setAddedToWishList] = useState(false);

  const { addToCart, setCartItems } = useContext(cartContext);
  const { wishList, addToWishList, removeItemFromWishlist, updateWishlist } = useContext(wishlistContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (wishList) {
      const isInWishlist = wishList.some((prod) => prod._id === id);
      setAddedToWishList(isInWishlist);
    }
  }, [id, wishList]);

  const handleAddToCart = useCallback(async (productId) => {
    try {
      const addToCartResult = await addToCart(productId);
      if (addToCartResult?.data?.status === "success") {
        setCartItems(addToCartResult.data.numOfCartItems);
      } else {
        console.error("Unexpected response structure:", addToCartResult);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }, [addToCart, setCartItems]);

  const handleWishlistToggle = useCallback(async (productId) => {
    setAddedToWishList(!addedToWishList);
    try {
      const wishlistAction = addedToWishList ? removeItemFromWishlist : addToWishList;
      const result = await wishlistAction(productId);
      if (result?.data?.status === "success") {
        updateWishlist();
      } else {
        setAddedToWishList(addedToWishList);
        console.error("Unexpected response structure:", result);
      }
    } catch (error) {
      setAddedToWishList(addedToWishList);
      console.error(`Error ${addedToWishList ? "removing" : "adding"} item to wishlist:`, error);
    }
  }, [addedToWishList, addToWishList, removeItemFromWishlist, updateWishlist]);

  return (
    <div className="col">
      <div className={`card rounded-1 ${styles.cardProduct}`}>
        <div className="card-body p-3">
          {isLoading ? (
            <ItemPlaceholder />
          ) : (
            <>
              <div className="text-center position-relative">
                <Link to={`/details/${id}`}>
                  <LazyImage className="w-100 h-25" src={imageUrl} alt="product" />
                </Link>
                <div className={styles.cartProductAction}>
                  <IconButton
                    to={`/details/${id}`}
                    tooltip="Quick View"
                    iconClass="fa-regular fa-eye"
                  />
                  <IconButton
                    onClick={() => handleWishlistToggle(id)}
                    tooltip={addedToWishList ? "Remove from Wishlist" : "Add to Wishlist"}
                    iconClass={`fa-solid fa-heart ${addedToWishList ? styles.addedToWishlist : ""}`}
                    isLink={false}
                  />
                </div>
              </div>
              <div className="text-sm-start mb-1 mt-1" title={title}>
                <Link className="text-muted text-decoration-none h6" to={`/details/${id}`}>
                  {title.split(" ").splice(0, 2).join(" ")}
                </Link>
              </div>
              <h2 className="fs-6">
                <Link className="text-dark text-decoration-none" to="#">
                  {category}
                </Link>
              </h2>
              <div className="text-warning">
                <small>
                  <StarRating rating={rating} />
                </small>
                <span className="text-muted small px-2">{rating}</span>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="text-dark">{price} EGY</div>
                <button
                  onClick={() => handleAddToCart(id)}
                  className="btn btn-sm bg-main text-white border-0 p-2 rounded-2"
                >
                  +Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Item;

