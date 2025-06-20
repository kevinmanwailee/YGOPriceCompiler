import React, { useState } from "react";
import { useCart } from "../context/CartContext.js";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartDropdown = () => {
  const { cart, cartTotal } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleCheckout() {
    setAnchorEl(null);
    navigate("/checkout");
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        disablePortal={false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          style: { width: "350px", maxHeight: "400px", paddingTop: "16px" },
        }}
      >
        {cart.length === 0 ? (
          <MenuItem disabled>Your cart is empty</MenuItem>
        ) : (
          <List dense>
            {cart.map(({quantity, name, imgURL, details}, index) => (
              <ListItem
                divider
                key={`${name}-${index}`}
                alignItems="flex-start"
              >
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 5fr 1fr"
                  gap="2px"
                  width="100%"
                >
                  <ListItemText secondary={quantity} />
                  <Stack gap={0}>
                    <ListItemText primary={name} secondary={details.set_name} />
                  </Stack>
                  <ListItemText primary={"$" + Number(details.set_price).toFixed(2)}/>
                </Box>
              </ListItem>
            ))}
            <ListItem>
              <Box
                display="flex"
                gridTemplateColumns="4fr 1fr"
                gap={2}
                width="100%"
              >
                <ListItemText primary="Subtotal" />
                <ListItemText align="right" primary={"$" + cartTotal} />
              </Box>
            </ListItem>
          </List>
        )}
        <MenuItem onClick={handleCheckout}>
          <Typography variant="body2" color="primary">
            Go to Checkout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CartDropdown;
