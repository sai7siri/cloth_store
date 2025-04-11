import {Routes , Route, useLocation, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {Toaster} from 'react-hot-toast';


import Home from "./pages/Home"
import NavBar from "./components/NavBar.jsx";
import Collections from "./pages/Collections"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart"
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductsView from "./components/ProuctsView.jsx"
import SignUp from "./authPages/SignUp.jsx";
import SignIn from "./authPages/SignIn.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import Profile from "./pages/dashboard/Profile.jsx"
import Orders from "./pages/dashboard/Orders.jsx"
import AllOrders from "./admin/AllOrders.jsx";
import TotalProducts from "./admin/TotalProducts.jsx";
import { useProductContext } from "./context/product.jsx";
import CheckOut from "./pages/checkout/CheckOut.jsx";
import PaypalReturn from "./pages/checkout/PaypalReturn.jsx";
import PaymentSuccess from "./pages/checkout/PaymentSuccess.jsx";
import PaymentCancelled from "./pages/checkout/CancelPayment.jsx";




export default function App(){

  const {accUser} = useProductContext();


  // const location = useLocation();

  // const disable = location.pathname === '/' || location.pathname === '/collections' ||  location.pathname === '/about' 


  return(
    <>
      <NavBar />
      {/* <SearchBar /> */}
      <Cart />
      <div className="container">
      <Routes>
        <Route path="/" element={ <Home />   } />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/productview/:id" element={ <ProductsView /> } />

        {/* checkout routess */}
        <Route path="/checkout" element={ <CheckOut /> } />
        <Route path="/paypal-return" element={ <PaypalReturn /> } />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/paypal-cancel" element={<PaymentCancelled />} />

        {/* user dashboard page */}
        <Route path="/dashboard" element={ <DashBoard /> } >
        <Route path="profile" element={ <Profile /> } />
        <Route path="order" element = { <Orders /> } />

        <Route path="allorders" element={ <AllOrders /> } />
        <Route path="allproducts" element={ <TotalProducts /> } />

        </Route>

        {/* auth pages  */}
  
            <Route path = "/signup" element={ accUser === null ? <SignUp /> : <Navigate to="/" /> } />
            <Route path ='/signin' element={ accUser === null ? <SignIn /> : <Navigate to="/" /> } />

      </Routes>
    
      <ToastContainer />
      <Toaster />
    </div>
      </>
  )
}