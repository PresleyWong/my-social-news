// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Missing from "./pages/Missing";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import SearchResults from "./pages/SearchResults";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/posts/search" element={<SearchResults />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<Missing />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
