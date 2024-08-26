import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { TokenContext } from "./Context/TokenContext";
import { useContext, useEffect } from "react";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtextedRoutes";
import ItemDetials from "./Components/ItemDetials/ItemDetials";
import CheckOut from "./Components/CheckOut/CheckOut";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import { Helmet } from "react-helmet";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index : "true",
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoutes>
              <ItemDetials />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  let { setToken } = useContext(TokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  });

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Salla</title>
      </Helmet>
      
    </>
  );
}

export default App;
