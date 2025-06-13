import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.js";
import Header from "./header.js";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  ListItemAvatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Checkout() {
  const { cart, cartTotal, updateQuantity } = useCart();

  function handleQuantity(name, value){
    updateQuantity(name, value)
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          paddingTop: "80px",
          maxWidth: "1200px",
          minWidth: "600px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography sx={{ alignSelf: "center" }} variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Paper sx={{ p: 2 }}>
          <List>
            {cart.map(([qty, name, details, imgURL]) => (
              <ListItem
                key={name}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  {/* Cards are 59:86. Apply this ratio to width/height*/}
                  <Avatar
                    variant="square"
                    src={imgURL}
                    alt={name}
                    sx={{ width: 100, height: 150, mr: 15, ml: 4 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={name} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleQuantity(name, qty-1)
                    }}
                  >
                    –
                  </IconButton>
                  <Typography>{qty}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleQuantity(name, qty+1)
                    }}
                  >
                    +
                  </IconButton>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    minWidth: 120,
                    textAlign: "right",
                    fontWeight: "bold",
                    mr: 4,
                  }}
                >
                  ${(details.set_price * qty).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Subtotal:</Typography>
            <Typography variant="h6">${cartTotal}</Typography>
          </Grid>
        </Paper>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined">Continue Shopping</Button>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default Checkout;
