import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap-icons/font/bootstrap-icons.css';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all";

import TokenContextProvider from "./Context/TokenContext";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/cartContext";
import WishlishContextProvider from "./Context/wishlist";
/* -------------------------------------------------------------------------- */
/*                              import libraries                              */
/* -------------------------------------------------------------------------- */

const root = ReactDOM.createRoot(document.getElementById("root"));

let queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WishlishContextProvider>
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
    </WishlishContextProvider>
  </React.StrictMode>
);
