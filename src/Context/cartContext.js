


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export let cartContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function addToCart(productId) {
  if (!headers.token) {
    toast.error("User is not authenticated");
    return;
  }

  const promise = axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers }
    )
    .then((res) => res)
    .catch((error) => {
      console.error("Error adding item to cart:", error);
      throw error;
    });

  toast.promise(promise, {
    loading: "Adding Cart item...",
    success: "Cart Item Added",
    error: "Error adding item",
  });

  return promise;
}

function getCart() {
  if (!headers.token) {
    toast.error("User is not authenticated");
    return;
  }

  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
    .then((res) => res)
    .catch((error) => {
      console.error("Error fetching cart:", error);
      throw error;
    });
}

function deleteCartItem(productId) {
  if (!headers.token) {
    toast.error("User is not authenticated");
    return;
  }

  const promise = axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((res) => res)
    .catch((error) => {
      console.error("Error deleting item from cart:", error);
      throw error;
    });

  toast.promise(promise, {
    loading: "Deleting Cart Item...",
    success: "Cart Item Deleted",
    error: "Error deleting item",
  });

  return promise;
}

function deleteAllCartItems() {
  if (!headers.token) {
    toast.error("User is not authenticated");
    return;
  }

  const promise = axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    .then((res) => res)
    .catch((error) => {
      console.error("Error deleting all items from cart:", error);
      throw error;
    });

  toast.promise(promise, {
    loading: "Deleting all items...",
    success: "All Cart Items Deleted",
    error: "Error deleting all items",
  });

  return promise;
}

function updateCartProductQuantity(productId, count) {
  if (!headers.token) {
    toast.error("User is not authenticated");
    return;
  }

  const promise = axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    )
    .then((res) => res)
    .catch((error) => {
      console.error("Error updating cart item:", error);
      throw error;
    });

  toast.promise(promise, {
    loading: "Updating Cart Item...",
    success: "Item Updated",
    error: "Error updating item",
  });

  return promise;
}

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numCartItems, setCartItems] = useState(null);

  async function getInitialCart() {
    try {
      const { data } = await getCart();
      if (data) {
        setCartItems(data.numOfCartItems);
        setCartId(data.data._id);
      }
    } catch (error) {
      console.error("Error initializing cart:", error);
    }
  }

  async function updateCartItems() {
    try {
      const { data } = await getCart();
      if (data) {
        setCartItems(data.numOfCartItems);
      }
    } catch (error) {
      console.error("Error updating cart items:", error);
    }
  }

  function cartOnlinePayment(shippingAddress) {
    if (!headers.token) {
      toast.error("User is not authenticated");
      return;
    }

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((error) => {
        console.error("Error processing online payment:", error);
        throw error;
      });
  }

  useEffect(() => {
    getInitialCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        deleteCartItem,
        updateCartProductQuantity,
        cartOnlinePayment,
        numCartItems,
        setCartItems,
        updateCartItems,
        deleteAllCartItems,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
