import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";

// MUI v5 Icons
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(
      resetPassword(token, {
        password,
        confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <Fragment>
      <MetaData title="Reset Password" />

      {loading ? (
        <Loader />
      ) : (
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Reset Password</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div className="resetPasswordInput">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="resetPasswordInput">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Update Password"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
