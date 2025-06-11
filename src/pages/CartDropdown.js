import React, { useState } from "react";
import { useCart } from "../context/CartContext.js";
import {
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

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          style: { width: "300px", maxHeight: "400px", paddingTop: "16px" },
        }}
      >
        {cart.length === 0 ? (
          <MenuItem disabled>Your cart is empty</MenuItem>
        ) : (
          <List dense>
            {cart.map(([quantity, name, details], index) => (
              <ListItem divider key={`${name}-${index}`} alignItems="flex-start">
                <Box
                  display="grid"
                  gridTemplateColumns="1fr 5fr 1fr"
                  gap={2}
                  width="100%"
                >
                  <ListItemText secondary={quantity} />
                  <ListItemText primary={name} />
                  <ListItemText secondary={"$" + details.set_price} />
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
                <ListItemText primary="Subtotal"/>
                <ListItemText align="right" primary={"$"+cartTotal}/>
              </Box>
          </ListItem>
          </List>
        )}
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="primary">
            Go to Checkout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CartDropdown;
