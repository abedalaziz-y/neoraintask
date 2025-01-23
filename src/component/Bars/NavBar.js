import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Badge, Avatar } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';

const logoPic = new URL("user.png", import.meta.url);

const NavBar = () => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({ type: "LOGE_OUT", payload: null });
    navigate("/login");
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const { Item, SubMenu } = Menu;

  const userAvatar = user?.img || logoPic; // Default avatar
  const userName = user?.name || user?.email?.split('@')[0] || "Guest"; // Fallback to 'Guest' if no name or email
  const userRole = user?.role || "user"; // Default to 'user' role if no role is provided

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {/* Home */}
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

     

      {/* User Menu */}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="ms-auto">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          className="navbar-brand ms-auto"
          icon={
           user.img?( <Avatar
            src={user.img}
            shape="circle"
            size="large"
            icon={<UserOutlined />}
          />): <Avatar
        
          shape="circle"
          size="large"
          icon={<UserOutlined />}
        />
          }
          title={userName}
        >
          {userRole === "admin" && (
            <>
              <Item key="dashboard" icon={<DashboardOutlined style={{ color: 'blue' }} />}>
                <Link to="/admin/activity">Analytics</Link>
              </Item>
            </>
          )}
          <Item key="logout" icon={<LogoutOutlined style={{ color: 'red' }} />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default NavBar;
