import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";


function Cart() {
  let { getCart, deleteCartItem, updateCartProductQuantity, updateCartItems, deleteAllCartItems } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numCartItems, setCartItems] = useState(null);

  async function getCartDetails() {
    try {
      let { data } = await getCart();
      setCartItems(data?.numOfCartItems || 0);
      setCartDetails(data);
      console.log("from cart details", data);
    } catch (error) {
      console.error("Error getting cart details:", error);
    }
  }

  async function removeItem(productId) {
    try {
      setIsLoading(true);
      let { data } = await deleteCartItem(productId);
      setCartItems(data.numOfCartItems);
      setCartDetails(data);
      updateCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAllCart() {
    try {
      setIsLoading(true);
      let { data } = await deleteAllCartItems();
      setCartItems(data.numOfCartItems);
      setCartDetails(data);
      updateCartItems();
    } catch (error) {
      console.error("Error deleting all cart items", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateItemCount(productId, count) {
    let data;
    try {
      setIsLoading(true);
      const response = await updateCartProductQuantity(productId, count);
      data = response.data;
    } catch (error) {
      console.error("Error updating the item:", error);
    } finally {
      setIsLoading(false);
      if (data) {
        setCartDetails(data);
      }
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  if (!cartDetails) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center">
            <p>Loading cart details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="mx-auto p-5">
            <div className="d-flex justify-content-between">
              <h2 className="mb-3">Cart</h2>
              <button onClick={deleteAllCart} disabled={cartDetails.numOfCartItems === 0} className="btn btn-outline-danger btn-sm small">Delete All</button>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div className="text-muted">
                Total Price :{" "}
                {cartDetails.data ? (
                  <span className="mainText">
                    {cartDetails.data.totalCartPrice} EGY
                  </span>
                ) : (
                  <span>
                    <p className="placeholder-glow">
                      <span
                        className="placeholder w-20"
                        style={{
                          height: "20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      ></span>
                    </p>
                  </span>
                )}
              </div>
              <div className="text-muted">
                Total cart Items :{" "}
                {cartDetails.numOfCartItems ? (
                  <span className="mainText">{cartDetails.numOfCartItems}</span>
                ) : (
                  <span>
                    <p className="placeholder-glow">
                      <span
                        className="placeholder w-20"
                        style={{
                          height: "20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      ></span>
                    </p>
                  </span>
                )}
              </div>
            </div>
            {cartDetails.data?.products.map((ele) => (
              <div className="row py-2 border-bottom" key={ele.product._id}>
                <div className="col-md-2">
                  <img src={ele.product.imageCover} className="w-100" alt={ele.product.title} />
                </div>
                <div className="col-md-10 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="ls">
                      <h6>{ele.product.title}</h6>
                      <span>{ele.product.brand.name}</span>
                      <h5>
                        <span className="mainText">{ele.price}</span> EGY
                      </h5>
                      <button
                        onClick={() => removeItem(ele.product._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash3"></i> delete
                      </button>
                    </div>
                    <div className="rs">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          disabled={ele.count === 1}
                          onClick={() => updateItemCount(ele.product._id, ele.count - 1)}
                          type="button"
                          className="btn btn-outline-dark"
                        >
                          -
                        </button>
                        <span className="textMain border-top border-bottom border-black p-2">
                          {ele.count}
                        </span>
                        <button
                          onClick={() => updateItemCount(ele.product._id, ele.count + 1)}
                          type="button"
                          className="btn btn-outline-dark"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/checkout" className={`btn btn-outline-success w-100 ${cartDetails.numOfCartItems === 0 && 'disabled'}`}>
          Check Out
        </Link>
      </div>
    </>
  );
}

export default Cart;
