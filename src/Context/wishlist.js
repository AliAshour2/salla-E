import axios from "axios";
import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

export const wishlistContext = createContext();

const WishlistContextProvider = (props) => {
  const [wishList, setWishList] = useState([]);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(null);

  const headers = useMemo(() => ({
    token: localStorage.getItem("userToken"),
  }), []);

  const showToast = useCallback((promise, messages) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  }, []);

  const addToWishList = useCallback(async (productId) => {
    const promise = axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );

    showToast(promise, {
      loading: "Adding WishList item",
      success: "WishList Item Added",
      error: "Error adding item",
    });

    return promise;
  }, [headers, showToast]);

  const getWishList = useCallback(() => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
  }, [headers]);

  const removeItemFromWishlist = useCallback(async (productId) => {
    const promise = axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });

    showToast(promise, {
      loading: "Deleting Product from wishlist",
      success: "Product deleted from wishlist",
      error: "Error removing product from wishlist",
    });

    return promise;
  }, [headers, showToast]);

  const updateWishlist = useCallback(async () => {
    try {
      const response = await getWishList();
      setWishList(response.data?.data || []);
      setWishlistItemsCount(response.data?.count || 0);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  }, [getWishList]);

  useEffect(() => {
    updateWishlist();
  }, [updateWishlist]);

  return (
    <wishlistContext.Provider
      value={{
        wishList,
        setWishList,
        addToWishList,
        getWishList,
        removeItemFromWishlist,
        wishlistItemsCount,
        setWishlistItemsCount,
        updateWishlist,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
};

export default WishlistContextProvider;
