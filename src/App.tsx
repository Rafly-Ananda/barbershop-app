import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Details from "./components/history/Details";
import Index from "./components/history/Index";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import Book from "./pages/Book";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Queue from "./pages/Queue";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="queue" element={<Queue />} />
          <Route path="book" element={<Book />} />
          <Route path="payment" element={<Payment />} />
          <Route path="account" element={<Account />} />
          <Route path="history" element={<History />}>
            <Route index element={<Index />} />
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
