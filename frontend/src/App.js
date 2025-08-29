import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Route.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrdersDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllEvents } from "./redux/actions/event";
import { getAllProducts } from "./redux/actions/product";
import { server } from "./server";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage.jsx";
import { useDispatch, useSelector } from "react-redux";

const AppRoutes = ({ stripeApiKey }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/SignUp" element={<SignUpPage />} />
    <Route path="/activation/:activation_token" element={<ActivationPage />} />
    <Route
      path="/seller/activation/:activation_token"
      element={<SellerActivationPage />}
    />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/product/:id" element={<ProductDetailsPage />} />
    <Route path="/best-selling" element={<BestSellingPage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route
      path="/checkout"
      element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      }
    />
    <Route path="/order/success/" element={<OrderSuccessPage />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/inbox"
      element={
        <ProtectedRoute>
          <UserInbox />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/order/:id"
      element={
        <ProtectedRoute>
          <OrderDetailsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/track/order/:id"
      element={
        <ProtectedRoute>
          <TrackOrderPage />
        </ProtectedRoute>
      }
    />
    <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
    <Route path="/shop-create" element={<ShopCreatePage />} />
    <Route path="/shop-login" element={<ShopLoginPage />} />
    <Route
      path="/shop/:id"
      element={
        <SellerProtectedRoute>
          <ShopHomePage />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-settings"
      element={
        <SellerProtectedRoute>
          <ShopSettingsPage />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/seller-dashboard"
      element={
        <SellerProtectedRoute>
          <ShopDashboardPage />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-create-product"
      element={
        <SellerProtectedRoute>
          <ShopCreateProduct />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-products"
      element={
        <SellerProtectedRoute>
          <ShopAllProducts />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-create-event"
      element={
        <SellerProtectedRoute>
          <ShopCreateEvents />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-events"
      element={
        <SellerProtectedRoute>
          <ShopAllEvents />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-orders"
      element={
        <SellerProtectedRoute>
          <ShopAllOrders />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-refunds"
      element={
        <SellerProtectedRoute>
          <ShopAllRefunds />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/order/:id"
      element={
        <SellerProtectedRoute>
          <ShopOrdersDetails />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-coupons"
      element={
        <SellerProtectedRoute>
          <ShopAllCoupons />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-withdraw-money"
      element={
        <SellerProtectedRoute>
          <ShopWithdrawMoneyPage />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/dashboard-messages"
      element={
        <SellerProtectedRoute>
          <ShopInboxPage />
        </SellerProtectedRoute>
      }
    />
    <Route
      path="/admin-dashboard"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardPage />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-users"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardUsers />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-sellers"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardSellers />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-orders"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardOrders />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-products"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardProducts />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-events"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardEvents />
        </ProtectedAdminRoute>
      }
    />
    <Route
      path="/admin-withdraw-request"
      element={
        <ProtectedAdminRoute>
          <AdminDashboardWithdraw />
        </ProtectedAdminRoute>
      }
    />
    {stripeApiKey && (
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
    )}
  </Routes>
);

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (!user && !seller) {
      dispatch(loadUser());
      dispatch(loadSeller());
    }
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    async function fetchStripeKey() {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    }
    fetchStripeKey();
  }, [dispatch, user, seller]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <AppRoutes stripeApiKey={stripeApiKey} />
        </Elements>
      ) : (
        <AppRoutes stripeApiKey={null} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
