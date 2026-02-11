import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { getAdminProduct, clearErrors } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products = [], error: productError } = useSelector(
    (state) => state.products
  );
  const { orders = [], error: orderError } = useSelector(
    (state) => state.allOrders
  );
  const { users = [], error: userError } = useSelector(
    (state) => state.allUsers
  );

  // Out of stock calculation
  const outOfStock = products.filter((item) => item.Stock === 0).length;

  // Total revenue calculation
  const totalAmount = orders.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  useEffect(() => {
    if (productError) {
      toast.error(productError);
      dispatch(clearErrors());
    }

    if (orderError) {
      toast.error(orderError);
      dispatch(clearErrors());
    }

    if (userError) {
      toast.error(userError);
      dispatch(clearErrors());
    }

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, productError, orderError, userError]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, totalAmount],
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: [
        "rgba(255, 99, 132, 0.7)",   // red
        "rgba(54, 162, 235, 0.7)",   // blue
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
      ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1" variant="h4">
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>

          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products.length}</p>
            </Link>

            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>

            <Link to="/admin/users">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
