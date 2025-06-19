// TODO: Change cart storage => unique id shouldn't be name
//        user should be able to add the same card from different sets

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext.js";
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Checkout() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [justFocused, setJustFocused] = useState(false);

  useEffect(() => {
    document.title = "View Cart | YGO Converter";
  }, []);

  function handleQuantity(name, value) {
    if (value < 1) return; // prevent quantity less than 1
    updateQuantity(name, value);
  }

  function handleDelete(name) {
    removeFromCart(name);
  }

  function handleClickItem(name){
    navigate("/card/" + name)
  }

  function handleContinueShopping() {
    setJustFocused(true);
    inputRef.current?.focus();

    setTimeout(() => setJustFocused(false), 500);
  }

  return (
    <>
      <Header inputRef={inputRef} justFocused={justFocused} />
      <Box
        sx={{
          p: 4,
          display: "flex",  
          flexDirection: "column",
          paddingTop: "80px",
          maxWidth: "1200px",
          // minWidth: "600px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography sx={{ alignSelf: "center" }} variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        {cartTotal !== 0 && (
          <Paper sx={{ p: 2, maxWidth: "1200px", width: "100%" }}>
            <List>
              {/* Header row */}
              <ListItem
                sx={{
                  bgcolor: "grey.200",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
                divider
              >
                <Box sx={{ flex: 3, ml: 4, display: "flex", alignItems: "center" }}>
                  Product
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Quantity</Box>
                <Box sx={{ flex: 1, textAlign: "right", pr: 2 }}>Price</Box>
                <Box sx={{ flex: 0.5, textAlign: "center" }}>Remove</Box>
              </ListItem>

              {/* Cart items */}
              {cart.map(({quantity, name, imgURL, details}) => (
                <ListItem
                  key={name}
                  sx={{ display: "flex", alignItems: "center", px: 2 }}
                  divider
                >
                  {/* Name + image */}
                  <Box
                    sx={{
                      flex: 3,
                      display: "flex",
                      alignItems: "center",
                      ml: 4,
                      gap: 1,
                    }}
                  >
                    <Avatar
                      variant="square"
                      src={imgURL}
                      alt={name}
                      onClick={() => handleClickItem(name)}
                      sx={{ cursor:"pointer", width: 100, height: 150, padding:2 }}
                    />
                    <Stack sx={{ marginLeft:2 }}>
                      <Typography>{name}</Typography>
                      <Typography color="text.secondary" fontSize="0.8rem">{details.set_name}</Typography>
                      <Typography color="text.secondary" fontSize="0.8rem">{details.set_rarity}</Typography>
                    </Stack>
                  </Box>

                  {/* Quantity */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleQuantity(name, (quantity) - 1)}
                      disabled={(quantity) <= 1}
                    >
                      –
                    </IconButton>
                    <Typography>{(quantity)}</Typography>
                    <IconButton size="small" onClick={() => handleQuantity(name, (quantity) + 1)}>
                      +
                    </IconButton>
                  </Box>

                  {/* Price */}
                  <Typography
                    variant="body1"
                    sx={{
                      flex: 1,
                      textAlign: "right",
                      fontWeight: "bold",
                      pr: 2,
                    }}
                  >
                    ${(Number(details.set_price) * Number(quantity)).toFixed(2)}
                  </Typography>

                  {/* Remove */}
                  <Box sx={{ flex: 0.5, textAlign: "center" }}>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(name)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
            
            <Grid container justifyContent="space-between">
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
            </Grid>
          </Paper>
        )}

        {cartTotal === 0 && (
          <Typography sx={{ alignSelf: "center" }} variant="h6" gutterBottom>
            Shopping cart is empty
          </Typography>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => handleContinueShopping()} variant="outlined">
            Continue Shopping
          </Button>
          {cartTotal !== 0 && (
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
