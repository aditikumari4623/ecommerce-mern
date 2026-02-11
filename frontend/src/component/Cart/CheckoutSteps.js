import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step key={index} completed={activeStep >= index}>
            <StepLabel
              icon={item.icon}
              sx={{
                "& .MuiStepLabel-label": {
                  color:
                    activeStep >= index ? "tomato !important" : "gray",
                },
                "& .MuiSvgIcon-root": {
                  color:
                    activeStep >= index ? "tomato !important" : "gray",
                },
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
