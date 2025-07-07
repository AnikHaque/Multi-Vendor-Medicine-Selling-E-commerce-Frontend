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

export default function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<MainAbout />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<SuccessStories />} />
      <Route path="/browse-tasks" element={<BrowseTasks />} />
      <Route path="/bids/:taskId" element={<BidsPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route index element={<Overview />} />
        <Route
          path="add-task"
          element={<AddTask user={user} token={token}></AddTask>}
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
