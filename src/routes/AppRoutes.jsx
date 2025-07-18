import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../components/Products";
import Login from "../components/Login";
import Register from "../components/Register";
import Blogs from "../components/Blogs/Blogs";
import NotFound from "../components/NotFound/NotFound";
import Profile from "../components/Profile/Profile";
import SuccessStories from "../components/Success-Stories/Success";
import SubscriptionDetail from "../components/Subscription/SubscriptionDetails";
import ProtectedRoute from "../pages/ProtectedRoute";
import AddTask from "../components/Tasks/AddTask";
import BrowseTasks from "../components/Tasks/BrowseTasks";
import TaskDetails from "../components/Tasks/TaskDetails";
import UpdateTaskPage from "../components/Tasks/UpdateTask";
import MyPostedTasks from "../components/Tasks/MyPostedTasks";
import BidsPage from "../components/Tasks/BidsPage";
import Contact from "../components/Contact/Contact";
import AboutPage from "../components/About/About";
import MainAbout from "../components/About/MainAbout";
import Overview from "../components/Dashboard/Overview/OverView";
import DashboardLayout from "../components/Layout/DashboardLayout";
import DashPopularTasks from "../components/Dashboard/Tasks/DashPopularTasks";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import ServiceCardDash from "../components/Dashboard/Tasks/DashFeaturedTasks";
import AddBlog from "../components/Dashboard/Blogs/AddBlog";
import ProductPage from "../components/Tasks/ProductDetails";
import CreateMedicinePage from "../components/Dashboard/Medicines/CreateMedicine";
import CreateCategory from "../components/Dashboard/Medicines/CreateCategory";
import CategoryDetails from "../components/Categories/CategoryDetails";

import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import Invoice from "../components/Invoice/Invoice";
import ManageUsers from "../components/Dashboard/ManageUsers/ManageUsers";
import ManageCategory from "../components/Dashboard/ManageCategories/ManageCategory";
import AdminPayments from "../components/Dashboard/Payments/Payments";
import SalesReport from "../components/Dashboard/Report/SalesReport";
import ManageMedicines from "../components/Dashboard/ManageMedicines/ManageMedicines";
import SellerPaymentHistory from "../components/Dashboard/Payments/SellerPaymentHistory";
import UserPaymentHistory from "../components/Dashboard/Payments/UserPaymentHistory";
import AllMedicines from "../components/Shop/Shop";
import MedicinesTable from "../components/Shop/MedicineTable";
import ManageBannerAdvertise from "../components/Dashboard/ManageBanner/ManageBanner";
import SellerAdvertisementSection from "../components/Dashboard/Advertise/SellerAdvertise";
import BlogDetails from "../components/Blogs/BlogDetails";

export default function AppRoutes() {
 let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (e) {
  user = null;
}
const token = localStorage.getItem("token") || null;


  

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<MainAbout />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<SuccessStories />} />
      <Route path="/product-details" element={<ProductPage />} />
      <Route path="/browse-tasks" element={<BrowseTasks />} />
      <Route path="/category/:category" element={<CategoryDetails />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/cart" element={<Cart user={user} token={token} />} />
       <Route path="/checkout" element={<Checkout user={user} token={token} />} />
        <Route path="/shop" element={<MedicinesTable user={user} token={token} />} />
        <Route path="/shop" element={<MedicinesTable user={user} token={token} />} />
        
       <Route path="/invoice" element={<Invoice  />} />
      <Route path="/bids/:taskId" element={<BidsPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route index element={<Overview />} />
        <Route
          path="manage-users"
          element={<ManageUsers user={user} token={token}></ManageUsers>}
        />
        <Route
          path="seller-advertise"
          element={<SellerAdvertisementSection user={user} token={token}></SellerAdvertisementSection>}
        />
<Route
          path="manage-category"
          element={<ManageCategory user={user} token={token}></ManageCategory>}
        />
        <Route path="manage-banner" element={<ManageBannerAdvertise user={user} token={token} />} />
        <Route
          path="manage-payment"
          element={<AdminPayments user={user} token={token}></AdminPayments>}
        />
         <Route
          path="user-payment"
          element={<UserPaymentHistory user={user} token={token}></UserPaymentHistory>}
        />
         <Route
          path="add-medicine"
          element={<CreateMedicinePage user={user} token={token}></CreateMedicinePage>}
        />
<Route
          path="payment-history"
          element={<SellerPaymentHistory ></SellerPaymentHistory>}
        />
        <Route
          path="manage-medicines"
          element={<ManageMedicines user={user} token={token}></ManageMedicines>}
        />

         <Route
          path="sales"
          element={<SalesReport user={user} token={token}></SalesReport>}
        />

        <Route
          path="add-category"
          element={<CreateCategory user={user} token={token}></CreateCategory>}
        />

        <Route path="popular-tasks" element={<DashPopularTasks />} />
        <Route path="all-tasks" element={<BrowseTasks></BrowseTasks>} />
        <Route
          path="featured-tasks"
          element={<ServiceCardDash></ServiceCardDash>}
        />
        <Route path="my-tasks" element={<MyPostedTasks />} />
        <Route
          path="add-blog"
          element={<AddBlog user={user} token={token}></AddBlog>}
        />
      </Route>
      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user} token={token}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-details/:id"
        element={
          <ProtectedRoute user={user} token={token}>
            <TaskDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute user={user} token={token}>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions/:id"
        element={
          <ProtectedRoute user={user} token={token}>
            <SubscriptionDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-task"
        element={
          <ProtectedRoute user={user} token={token}>
            <AddTask user={user} token={token} />
          </ProtectedRoute>
        }
      />

      {/* New Protected Route for My Posted Tasks */}
      <Route
        path="/my-posted-tasks"
        element={
          <ProtectedRoute user={user} token={token}>
            <MyPostedTasks user={user} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/update-task/:id"
        element={
          <ProtectedRoute user={user} token={token}>
            <UpdateTaskPage />
          </ProtectedRoute>
        }
      />

      {/* Authentication Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
