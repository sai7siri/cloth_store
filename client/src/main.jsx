import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./context/product.jsx";
import {Provider} from 'react-redux'
import { store } from "./context/store.js";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <ProductContextProvider>

    <App />
    
  </ProductContextProvider>
  </Provider>
  </BrowserRouter>
  // </StrictMode>
);
