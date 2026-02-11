import React, { Fragment, useState } from "react";
import "./Header.css";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";


const EMPTY_ARRAY = [];

const UserOptions = ({ user }) => {
  // ✅ FIXED SELECTOR (NO WARNING, STABLE REFERENCE)
  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? EMPTY_ARRAY
  );

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dashboard = () => navigate("/admin/dashboard");
  const orders = () => navigate("/orders");
  const account = () => navigate("/account");
  const cart = () => navigate("/cart");

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "inherit" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  

  return (
    <Fragment>
      <Backdrop open={open} sx={{ zIndex: 10 }} />

      <SpeedDial
        ariaLabel="User Options"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        sx={{ zIndex: 11 }}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url || "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
