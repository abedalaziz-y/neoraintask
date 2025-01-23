import * as React from "react";
import { lazy, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { CURRENTUSER } from "./functions/auth";
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import io from 'socket.io-client';


const Login = lazy(() => import("./component/pages/Login"));
const ActivityPage = lazy(() => import("./component/pages/AdminPages/ActivityPage"));
const Register = lazy(() => import("./component/pages/Register"));
const RegisterComplete = lazy(() => import("./component/pages/RegisterComplete"));
const ResetPassword = lazy(() => import("./component/pages/ResetPassword"));
const Home = lazy(() => import("./component/gamelandingpage/pages/home/index"));
const NavBar = lazy(() => import("./component/Bars/NavBar"));



const App = () => {


  const { user } = useSelector((state) => state);

  const PublicRoute = ({ children }) => {
    return user && user.token ? <Navigate to="/" /> : children;
  };

  const PrivateRoute = ({ children }) => {
    return user && user.token ? children : <Navigate to="/login" />;
  };

  const Adminroute = ({ children }) => {
    return user && user.token && user.role==="admin" ? children : <Navigate to="/login" />;
  };
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const socket = io('https://user-analytics-system-825467496328.us-central1.run.app'); // Ensure this matches the backend port

    // Log when the connection is successfully established
    socket.on('connect', () => {
      console.log('Socket connection initialized');
    });

    // Log any errors during connection
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="col text-center text-dark p-5 h4">
            Neon <LoadingOutlined style={{ color: '#8038af' }} /> Rain
          </div>
        }
      >
      { user&& <NavBar />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
         <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/register/complete"
            element={
              <PublicRoute>
                <RegisterComplete />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/activity"
            element={
              <Adminroute>
                <ActivityPage  activities={activities}/>
              </Adminroute>
            }
          />
          
         
        </Routes>
       
      </Suspense>
    </div>
  );
};


export default App;
